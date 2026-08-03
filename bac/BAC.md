# Kilowatt App — BACboard Controller Protocol Reverse Engineering

**APK:** `Kilowatt_1.1.4_APKPure.apk`
**App:** `bike.kilowatt.Staging` v1.1.4 (build 44)
**Framework:** Expo SDK 49 / React Native + Hermes bytecode v94
**Bundle:** `assets/index.android.bundle` (5.2 MB Hermes bytecode)
**BLE Library:** `react-native-ble-plx` (plugin: `@config-plugins/react-native-ble-plx`)
**Analytics:** Datadog RUM, Firebase messaging

---

## 1. BLE Connection

### UUIDs — Nordic UART Service (NUS)

| Role | UUID |
|------|------|
| **Service** | `6E400001-B5A3-F393-E0A9-E50E24DCCA9E` |
| **TX (write to controller)** | `6E400002-B5A3-F393-E0A9-E50E24DCCA9E` |
| **RX (notify from controller)** | `6E400003-B5A3-F393-E0A9-E50E24DCCA9E` |

This is the standard Nordic UART Service used by nRF5 series microcontrollers (nRF52840 etc.).

### Connection Flow (react-native-ble-plx)

```
1. startDeviceScan(null, null, callback)
2. connectToDevice(deviceId, options)
3. discoverAllServicesAndCharacteristicsForDevice(deviceId)
4. monitorCharacteristicForDevice(deviceId, serviceUUID, rxCharUUID, callback)
5. (poll loop starts)
6. writeCharacteristicWithResponseForDevice(deviceId, serviceUUID, txCharUUID, base64data)
```

Stored device address defaults to `'212205376971727'` (placeholder) — user picks device by scanning.

### Polling Intervals

```js
timings = {
  realtime: 150,   // ms — live telemetry (speed, voltage, current, RPM)
  alerts:   1000,  // ms — faults and warnings check
  info:     500,   // ms — status/info frames
}
```

---

## 2. Controller Models

The BACboard line is identified by `currentRating` field:

| currentRating value | Model | Description |
|---------------------|-------|-------------|
| `200` | BAC855 | 55A, 8-72V |
| `268` | BAC2000 | ~20A rated variant |
| `576` | BAC4000 | Mid-power |
| `1122` | BAC8000 | High-power 8000W+ |

Power profiles (watts out / amps in):
- `easy`: 5392W / 10A
- `regular`: 8088W / 20A
- `powerful`: 10784W / 35A
- `ludicrous`: 14828W / 35A

---

## 3. Protocol — Modbus RTU over BLE NUS

The BACboard uses **Modbus RTU** framing over the Nordic UART Service (NUS). The BLE NUS acts as a transparent serial channel; Modbus RTU frames are sent over it unchanged.

### 3a. Physical Layer

NUS TX (app→controller): `WriteWithoutResponse` or `WriteWithResponse`
NUS RX (controller→app): `Notify`

BLE fragments large frames across multiple notification packets. The app reassembles them using the Modbus `byteCount` field.

### 3b. Modbus RTU Request (App → Controller, via NUS TX)

```
Byte 0: Slave address = 0x01 (hardcoded; also configurable at register 1039 "slaveId")
Byte 1: Function code
  0x03 = Read Holding Registers
  0x10 = Write Multiple Registers
Byte 2: Start address high byte
Byte 3: Start address low byte
Byte 4: Count high byte (FC=0x03: number of registers; FC=0x10: number of registers)
Byte 5: Count low byte
[FC=0x10 only: Byte 6: byte count = count*2; Bytes 7+: register data, big-endian]
Byte N-1: CRC low byte  (CRC-16/Modbus)
Byte N:   CRC high byte
```

#### CRC-16/Modbus (IBM CRC-16, reflected)
- Polynomial: 0x8005 (reflected: 0xA001)
- Initial value: 0xFFFF
- No input/output reflection (algorithm uses the reflected polynomial instead)
- Output: appended as [lo, hi] (little-endian)

```python
def crc16_modbus(data: bytes) -> int:
    crc = 0xFFFF
    for byte in data:
        crc ^= byte
        for _ in range(8):
            if crc & 1:
                crc = (crc >> 1) ^ 0xA001
            else:
                crc >>= 1
    return crc  # append as [crc & 0xFF, crc >> 8]
```

#### Example: Read registers 774–789 (telemetry block, 16 registers)
```
[0x01][0x03][0x03][0x06][0x00][0x10][CRC_LO][CRC_HI]
  774 = 0x0306, count = 16 = 0x0010
```

#### Example: Read calibration registers 829–832 (4 registers)
```
[0x01][0x03][0x03][0x3D][0x00][0x04][CRC_LO][CRC_HI]
  829 = 0x033D, count = 4 = 0x0004
```

### 3c. Modbus RTU Response (Controller → App, via NUS RX notify)

```
Byte 0: Slave address = 0x01
Byte 1: Function code echo (0x03 for read)
Byte 2: Byte count = number_of_registers × 2
Bytes 3 .. 2+byteCount: Register data, big-endian (MSB first), 2 bytes per register
  register[i] = (data[i*2] << 8) | data[i*2+1]
Last 2 bytes: CRC low, CRC high
```

Total response size for N registers: **3 + N×2 + 2** bytes.

#### Example: Response to "read 774–789" (16 regs → 37 bytes)
```
[0x01][0x03][0x20]  ← addr=1, FC=3, byteCount=32
[hi774][lo774] [hi775][lo775] ... [hi789][lo789]  ← 32 bytes
[CRC_LO][CRC_HI]
```
Register 774 (brake1Voltage) is at bytes [3][4]; register 789 at bytes [33][34].

### 3d. Value Serialization

Three formats for register values:

| Format | Description |
|--------|-------------|
| **Scaled** | `human_value = raw_int16 * scale_factor` (e.g. voltage ÷ 10 = volts) |
| **Enumerated** | Integer code mapped to string enum (ride mode, source, etc.) |
| **Masked** | Bit-field (fault flags, digital inputs, etc.) |

---

## 4. Realtime Telemetry Fields

These are the live data fields polled at 150ms intervals:

| Field | Description | Notes |
|-------|-------------|-------|
| `vehicleSpeed` | Vehicle speed | km/h or mph, from wheel RPM × diameter / gear ratio |
| `motorRpm` | Motor RPM | Calculated from `ratedMotorSpeed` and % rated |
| `motorCurrent` | Motor phase current | Amps |
| `motorTemperature` | Motor temperature | °C |
| `motorTemperatureSensorVoltage` | Motor temp sensor voltage | V |
| `batteryVoltage` | Battery voltage | V |
| `batteryCurrent` | Battery current | A (positive = discharge) |
| `batteryStateOfCharge` | Battery SOC | % |
| `batteryPower` | Battery power | W |
| `throttleVoltage` | Throttle sensor voltage | V (0–5V) |
| `brake1Voltage` | Brake 1 sensor voltage | V |
| `brake2Voltage` | Brake 2 sensor voltage | V |
| `powerboardTemperature` | Controller board temperature | °C |
| `controllerStatus` | Controller status byte | bitmask |
| `faults` | Active fault flags | bitmask, see §6 |
| `faults2` | Extended fault flags | bitmask, see §6 |
| `warnings` | Active warning flags | bitmask, see §7 |
| `warnings2` | Extended warning flags | bitmask, see §7 |
| `lastFault` | Last triggered fault code | — |
| `percentOfRatedRpm` | % of rated RPM | 0–100 |
| `digitalInputs` | Digital input states | bitmask |
| `analogBmsSocVoltage` | Analog BMS SOC voltage | V |
| `lightSensorVoltage` | Light sensor voltage | V |
| `rawPowerboardTemperatureSensorVoltage` | Raw temp sensor voltage | V |
| `tripMeter` | Trip distance accumulator | incremented each realtime frame |
| `softwareVersion` | Controller FW version | — |

### Display Colors (dark mode defaults)

| Field | Color |
|-------|-------|
| `tripMeter` | darkviolet |
| `vehicleSpeed` | springgreen |
| `batteryVoltage` | seagreen |
| `batteryStateOfCharge` | seagreen |
| `batteryCurrent` | deepskyblue |
| `motorTemperature` | orangered |
| `motorCurrent` | turquoise |
| `motorRpm` | dodgerblue |
| `faults` | crimson |
| `motorTemperatureSensorVoltage` | seagreen |
| `brake2Voltage` | seagreen |

---

## 5. Configuration Parameters

The BACboard has ~850+ named parameters accessible via read/write frames.
Partial list of key configuration parameters (with `address` field for buffer offset):

### Motor & Drivetrain
- `wheelDiameter` — wheel diameter (used for speed calculation)
- `gearRatio` — drivetrain gear ratio
- `ratedMotorSpeed` — rated motor RPM
- `ratedSystemVoltage` — nominal battery voltage
- `wheelSpeedSensorPulsesPerRevolution`
- `pedalSpeedSensorPulsesPerRevolution`

### Speed Limiting
- `vehicleMaximumSpeedStreetModeThrottle`
- `vehicleMaximumSpeedRaceModeThrottle`
- `vehicleJogSpeed` / `vehicleJogSpeed2`
- `speedLimitRampTime`

### Power / Torque Ramps
- `positiveMotoringTorqueRamp`
- `negativeMotoringTorqueRamp`
- `positiveBrakingTorqueRamp`
- `negativeBrakingTorqueRamp`
- `pedalecPositiveMotoringTorqueRamp`
- `pedalecNegativeMotoringTorqueRamp`

### Voltage Thresholds
- `averageOverVoltageThreshold`
- `instantaneousOverVoltageThreshold`
- `instantaneousUnderVoltageThreshold`
- `averageUnderVoltageThreshold`
- `lowBatteryVoltageFoldbackStartVoltage`
- `highBatteryFoldbackStartingVoltage`
- `instantaneousOverCurrentTripThreshold`

### Thermal Protection
- `motorOverTemperatureTripThreshold`

### Communication
- `canSyncLossTimeout`
- `communicationsConfigurationVector`

### Source/Input Selection
- `throttleSensorSource`
- `regenBrakeSource`
- `cutoffBrakeSensorSource`
- `torqueSensorVoltageSource`
- `digitalThrottleSensorSource`
- `voltageThresholdSingleSpeedTemperatureSource`

### PAS (Pedal Assist)
- `assistGain1` / `assistGain2` / `assistGain3` / `assistGainWalk`
- `assistSpeed1` / `assistSpeed2` / `assistSpeed3`
- `assistHighVoltageReading` / `assistLowVoltageReading`
- `assistCutOutDistance`
- `pedalecMinimumTimeout` / `pedalecMaximumTimeout`
- `pedalSenseDelay`

### Calibration & Manufacturing
- `modelDictionaryNumberLow` / `modelDictionaryNumberHigh`
- `mfgFlowCheck` / `mfgBarcodeType`

### Feature Flags
- `ebikeFlags` — bitmask, includes `brake` bit (read from `parameters.ebikeFlags.address`)
- `ebikeFlags2` — extended flags
- `faultClear` — write to clear faults

### Odometer / Version Support
- `odometerSupport` ≥ v6.02 — odometer feature requires controller FW ≥ 6.02
- `alternateFlagsSupport` ≥ v6.02 — alternate flags format
- `rpmLimitSupport` ≥ v6.021 — RPM limit feature

---

## 6. Fault Codes — Complete Bit Maps (FW 6026)

Source: `6026_ASIObjectDictionary.xml`. Flash codes shown as (group, position) for LED blink pattern.

### `faults` register (reg 258)

| Bit | Name | Flash Code |
|-----|------|------------|
| 0 | Averaged controller over voltage | 1,1 |
| 1 | Averaged phase over current | 1,2 |
| 2 | Current sensor calibration | 1,3 |
| 3 | Current sensor over current | 1,4 |
| 4 | Controller over temperature | 1,5 |
| 5 | Motor Hall sensor fault | 1,6 |
| 6 | Averaged controller under voltage | 1,7 |
| 7 | POST static gating test (phase short / damaged drivers) | 1,8 |
| 8 | Network communication timeout | 2,1 |
| 9 | Instantaneous phase over current | 2,2 |
| 10 | Motor over temperature | 2,3 |
| 11 | Throttle voltage outside range | 2,4 |
| 12 | Instantaneous controller over voltage | 2,5 |
| 13 | Internal error | 2,6 |
| 14 | POST dynamic gating test (damaged drivers) | 2,7 |
| 15 | Instantaneous under voltage | 2,8 |

### `faults2` register (reg 299 / 0x012B)

| Bit | Mask | JS Name | Description | Flash Code |
|-----|------|---------|-------------|------------|
| 0 | 0x0001 | `parameterCrc` | Parameter CRC | 3,1 |
| 1 | 0x0002 | `currentScaling` | Current scaling | 3,2 |
| 2 | 0x0004 | `voltageScaling` | Voltage scaling | 3,3 |
| 3 | 0x0008 | `headlightUndervoltage` | Headlight undervoltage | 3,4 |
| 4 | 0x0010 | `parameter3Crc` | Parameter 3 CRC | 3,5 |
| 5 | 0x0020 | `canBus` | CAN bus | 3,6 |
| 6 | 0x0040 | `hallStall` | Hall stall | 3,7 |
| 7 | 0x0080 | `bootloader` | Bootloader (not used) | 3,8 |
| 8 | 0x0100 | `parameter2Crc` | Parameter 2 CRC | 4,1 |
| 9 | 0x0200 | `hallVsSensorlessPosition` | Hall vs sensorless position >30° | 4,2 |
| 10 | 0x0400 | `dynameTorqueSensorVoltageOutsideRange` | Dyname torque sensor voltage outside range | 4,3 |
| 11 | 0x0800 | `dynameTorqueSensorStaticVoltageFault` | Dyname torque sensor static voltage fault | 4,4 |
| 12 | 0x1000 | `remoteCanFault` | Remote CAN fault | 4,5 |
| 13 | 0x2000 | `accelerometerSideTiltFault` | Accelerometer side tilt (fall detected) | 4,6 |
| 14 | 0x4000 | `openPhaseFault` | Open phase fault | 4,7 |
| 15 | 0x8000 | `analogBrakeFault` | Analog brake voltage out of range | 4,8 |

### `lastFaults2` register (reg 418 / 0x01A2)

Same bit layout as `faults` (not `faults2`) — reflects faults active at last power cycle:

| Bit | Mask | JS Name | Description |
|-----|------|---------|-------------|
| 0 | 0x0001 | `parameterCrc` | Parameter CRC |
| 1 | 0x0002 | `currentScaling` | Current scaling |
| 2 | 0x0004 | `voltageScaling` | Voltage scaling |
| 3 | 0x0008 | `headlightUndervoltage` | Headlight undervoltage |
| 4 | 0x0010 | `torqueSensor` | Torque sensor |
| 5 | 0x0020 | `canBus` | CAN bus |
| 6 | 0x0040 | `hallStall` | Hall stall |
| 7 | 0x0080 | `bootloader` | Bootloader (not used) |
| 8 | 0x0100 | `parameter2Crc` | Parameter 2 CRC |
| 9 | 0x0200 | `hallVsSensorlessPosition` | Hall vs sensorless position >30° |
| 10–15 | — | `spare10`–`spare15` | Reserved |

### `faults2Log` register (reg 1697 / 0x06A1)

Same bit layout as `faults2` — persistent log of extended faults since last clear:

| Bit | Mask | JS Name | Description | Flash Code |
|-----|------|---------|-------------|------------|
| 0 | 0x0001 | `parameterCrc` | Parameter CRC | 3,1 |
| 1 | 0x0002 | `currentScaling` | Current scaling | 3,2 |
| 2 | 0x0004 | `voltageScaling` | Voltage scaling | 3,3 |
| 3 | 0x0008 | `headlightUndervoltage` | Headlight undervoltage | 3,4 |
| 4 | 0x0010 | `parameter3Crc` | Parameter 3 CRC | 3,5 |
| 5 | 0x0020 | `canBus` | CAN bus | 3,6 |
| 6 | 0x0040 | `hallStall` | Hall stall | 3,7 |
| 7 | 0x0080 | `bootloader` | Bootloader (not used) | 3,8 |
| 8 | 0x0100 | `parameter2Crc` | Parameter 2 CRC | 4,1 |
| 9 | 0x0200 | `hallVsSensorlessPosition` | Hall vs sensorless position >30° | 4,2 |
| 10 | 0x0400 | `dynameTorqueSensorVoltageOutsideRange` | Dyname torque sensor voltage outside range | 4,3 |
| 11 | 0x0800 | `dynameTorqueSensorStaticVoltageFault` | Dyname torque sensor static voltage fault | 4,4 |
| 12 | 0x1000 | `remoteCanFault` | Remote CAN fault | 4,5 |
| 13 | 0x2000 | `accelerometerSideTiltFault` | Accelerometer side tilt (fall detected) | 4,6 |
| 14 | 0x4000 | `openPhaseFault` | Open phase fault | 4,7 |
| 15 | 0x8000 | `analogBrakeFault` | Analog brake voltage out of range | 4,8 |

### `faults3` register (FW ≥ 6.021)

| Bit | Name | Flash Code |
|-----|------|------------|
| 0 | Encoder sin voltage range | 9,1 |
| 1 | Encoder cos voltage range | 9,2 |
| 2 | Analog input voltage range saturation | 9,3 |
| 3 | Dual throttle out of range | 9,4 |
| 4–15 | Reserved | — |

### `warnings` register (reg 277)

| Bit | Name | Flash Code |
|-----|------|------------|
| 0 | Communication timeout | 5,1 |
| 1 | Hall sensor | 5,2 |
| 2 | Hall stall | 5,3 |
| 3 | Wheel speed sensor | 5,4 |
| 4 | CAN bus | 5,5 |
| 5 | Hall illegal sector | 5,6 |
| 6 | Hall illegal transition | 5,7 |
| 7 | Low battery voltage foldback | 5,8 |
| 8 | High battery voltage foldback | 6,1 |
| 9 | Motor temperature foldback | 6,2 |
| 10 | Controller over temperature foldback | 6,3 |
| 11 | Low battery SOC foldback | 6,4 |
| 12 | High battery SOC foldback | 6,5 |
| 13 | I²T overload foldback | 6,6 |
| 14 | Low temperature battery/controller foldback | 6,7 |
| 15 | BMS communication timeout (obsolete) | 6,8 |

### `warnings2` register (reg 359 / 0x0167)

| Bit | Mask | JS Name | Description | Flash Code |
|-----|------|---------|-------------|------------|
| 0 | 0x0001 | `throttleOutOfRange` | Throttle out of range warning | 7,1 |
| 1 | 0x0002 | `dualSpeedSensorWarning` | Dual speed sensor warning | 7,2 |
| 2 | 0x0004 | `dualSpeedSensorNoPulsesWarning` | Dual speed sensor no pulses | 7,3 |
| 3 | 0x0008 | `dynamicFlashFull` | Dynamic flash full | 7,4 |
| 4 | 0x0010 | `dynamicFlashReadError` | Dynamic flash read error | 7,5 |
| 5 | 0x0020 | `dynamicFlashWriteError` | Dynamic flash write error | 7,6 |
| 6 | 0x0040 | `params3Missing` | Parameters 3 missing | 7,7 |
| 7 | 0x0080 | `reserved7` | Missed CAN message | 7,8 |
| 8 | 0x0100 | `reserved8` | High battery temperature foldback | 8,1 |
| 9 | 0x0200 | `reserved9` | ADC saturation event | 8,2 |
| 10 | 0x0400 | `reserved10` | Reserved | — |
| 11 | 0x0800 | `reserved11` | Reserved | — |
| 12 | 0x1000 | `reserved12` | Reserved | — |
| 13 | 0x2000 | `reserved13` | Reserved | — |
| 14 | 0x4000 | `reserved14` | Reserved | — |
| 15 | 0x8000 | `reserved15` | Reserved | — |

---

## 7. Ride Modes (Siri Shortcuts)

The app registers 4 Siri shortcuts:

| Shortcut ID | Mode |
|-------------|------|
| `bike.kilowatt.Staging.Shortcut.RideModeNeutral` | Neutral (motor disabled) |
| `bike.kilowatt.Staging.Shortcut.RideModeOne` | Mode 1 (low power) |
| `bike.kilowatt.Staging.Shortcut.RideModeTwo` | Mode 2 (medium power) |
| `bike.kilowatt.Staging.Shortcut.RideModeThree` | Mode 3 (high power) |

Ride mode commands are written via `writeCharacteristicWithResponseForDevice` to the NUS TX characteristic.

---

## 8. Speed Calculation (Derived)

```js
// The app calculates vehicle speed from motor RPM:
// vehicleSpeed = (motorRpm * wheelDiameter * π) / (gearRatio * 1000 * 60)
// units: km/h

// And motorRpm from ratedMotorSpeed:
// motorRpm = ratedMotorSpeed * percentOfRatedRpm / 100
```

The `percentOfRatedRpm` is directly in the telemetry frame.
`wheelDiameter` and `gearRatio` are configuration parameters.

---

## 9. Thermistor Model

Function `Thermistor` (Function #30736, 1252 bytes) at `0x004f76d8` converts raw NTC thermistor sensor voltage to temperature (°C) using the Steinhart-Hart equation or a lookup table. Used for `motorTemperatureSensorVoltage` → `motorTemperature`.

The `44Thermistor model` string in the raw bundle (extracted earlier) refers to a 44-entry thermistor lookup table for the NTC model used on the BACboard.

---

## 10. Example: Connect and Read Telemetry (Python + bleak)

```python
import asyncio, struct
from bleak import BleakClient, BleakScanner

SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
TX_UUID      = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
RX_UUID      = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

SLAVE_ADDR = 0x01
FC_READ    = 0x03

# CRC-16/Modbus (IBM CRC-16, poly 0xA001 reflected)
def crc16(data: bytes) -> int:
    crc = 0xFFFF
    for b in data:
        crc ^= b
        for _ in range(8):
            crc = (crc >> 1) ^ 0xA001 if crc & 1 else crc >> 1
    return crc

def build_read_request(start_addr: int, count: int) -> bytes:
    frame = bytes([SLAVE_ADDR, FC_READ,
                   (start_addr >> 8) & 0xFF, start_addr & 0xFF,
                   (count >> 8) & 0xFF,       count & 0xFF])
    c = crc16(frame)
    return frame + bytes([c & 0xFF, c >> 8])

# Telemetry register addresses (register N → byte offset in response data = (N - start)*2)
TELEMETRY_START = 774
TELEMETRY_COUNT = 16  # registers 774–789

REGISTERS = {
    774: ('brake1Voltage',       1,    'mV raw'),
    775: ('throttleVoltage',     1,    'mV raw'),
    778: ('batterySOC',          1,    '%'),
    779: ('batteryCurrent',      0.1,  'A'),
    780: ('batteryVoltage',      0.1,  'V'),
    781: ('percentRatedRPM',     0.1,  '%'),
    782: ('motorRPM',            1,    'RPM'),
    783: ('motorCurrent',        0.1,  'A'),
    784: ('motorTemperature',    0.1,  '°C'),
    785: ('vehicleSpeed',        0.1,  'km/h'),
    786: ('powerboardTemperature', 0.1, '°C'),
    787: ('faults',              1,    'bitmask'),
    788: ('controllerStatus',    1,    'bitmask'),
    789: ('softwareVersion',     1,    ''),
}

rx_buffer = bytearray()
request = build_read_request(TELEMETRY_START, TELEMETRY_COUNT)

def on_notify(sender, data: bytearray):
    global rx_buffer
    rx_buffer += data
    # Try to parse a complete Modbus response
    while len(rx_buffer) >= 3:
        byte_count = rx_buffer[2]
        expected = 3 + byte_count + 2
        if len(rx_buffer) < expected:
            break  # wait for more bytes
        frame = rx_buffer[:expected]
        rx_buffer = rx_buffer[expected:]
        if frame[0] != SLAVE_ADDR or frame[1] != FC_READ:
            continue
        # Verify CRC
        calc = crc16(bytes(frame[:-2]))
        recv = frame[-2] | (frame[-1] << 8)
        if calc != recv:
            print(f'CRC mismatch: {calc:#06x} vs {recv:#06x}')
            continue
        # Parse register values (big-endian)
        data_bytes = frame[3:3+byte_count]
        for addr, (name, scale, unit) in REGISTERS.items():
            idx = (addr - TELEMETRY_START) * 2
            if idx + 1 < len(data_bytes):
                raw = struct.unpack_from('>h', data_bytes, idx)[0]  # signed int16 big-endian
                print(f'  {name:30s} = {raw * scale:.1f} {unit}')

async def main():
    devices = await BleakScanner.discover(timeout=5.0)
    addr = next((d.address for d in devices
                 if d.name and any(k in d.name for k in ('BAC', 'Kilowatt', 'BACBoard'))), None)
    if not addr:
        print('No BACboard found'); return

    async with BleakClient(addr) as client:
        await client.start_notify(RX_UUID, on_notify)
        print(f'Connected to {addr}')
        for _ in range(20):   # poll 20 times at 150ms
            await client.write_gatt_char(TX_UUID, request, response=False)
            await asyncio.sleep(0.15)

asyncio.run(main())
```

---

## 11. Actual Connect Sequence (Reverse-Engineered from HCI Snoop Log)

> **Source:** `btsnoop_hci.log` captured from working Kilowatt app v1.1.4 session with device `DC:B4:D9:4E:DB:2F` ("e-Bike").
> **Finding:** The app does NOT poll registers 774–789 directly for live telemetry. It uses a handshake + indirect subscription mechanism at reg 1536 (0x0600).

### 11a. Phase 1 — Session Handshake (reg 125 / 0x007D)

After BLE connect and CCCD enable, the app reads reg 125, then performs the session activation write sequence:

```
TX: 01 03 00 7D 00 01 [CRC]          // FC03 read reg 125 → response: 0x72 (114)
TX: 01 10 00 7D 00 01 02 00 A1 [CRC] // FC10 write reg 125 = 0xa1 (161) — activate
TX: 01 10 00 7D 00 01 02 00 72 [CRC] // FC10 write reg 125 = 0x72 (114) — confirm
```

Without this handshake, live data registers return all zeros.

### 11b. Phase 2 — Subscription Setup (reg 1536 = 0x0600)

The app programs reg 1536 (an indirect-access register bank) with source register addresses. Reading reg 1536 count=N then returns the live values of the subscribed source registers.

```
// Slots 0-4: write source register addresses [265, 258, 277, 260, 408]
TX: 01 10 06 00 00 05 0A  01 09  01 02  01 15  01 04  01 98  [CRC]
//                         ^^^^   ^^^^   ^^^^   ^^^^   ^^^^
//                         265    258    277    260    408

// Slots 5-9: write source register addresses [266, 261, 262, 327, 263]
TX: 01 10 06 05 00 05 0A  01 0A  01 05  01 06  01 47  01 07  [CRC]
```

### 11c. Phase 3 — Live Poll Loop (150 ms)

```
TX: 01 03 06 00 00 05 85 41   // FC03 read reg 1536 count=5
RX: 01 03 0A [s0Hi][s0Lo] [s1Hi][s1Lo] [s2Hi][s2Lo] [s3Hi][s3Lo] [s4Hi][s4Lo] [CRC]
```

Response is 15 bytes. Each slot returns the live value of its subscribed source register.

### 11d. Subscription Slot Mapping (All 10 Slots)

Confirmed from `Parameters.py` in the ASI dyno SDK (`github.com/username-tom/ASI`).
Read reg 1536 count=**10** to get all slots in one request.

| Slot | Source Reg | Parameter Name | Scale | Unit | Notes |
|------|-----------|----------------|-------|------|-------|
| 0 | 265 | Battery Voltage | /32 | V | `MB_BatteryVoltage` |
| 1 | 258 | Faults | 1 | bitmask | `MB_Faults` |
| 2 | 277 | Warnings | 1 | bitmask | `MB_Warnings` |
| 3 | 260 | unknown | — | — | TBD (logged) |
| 4 | 408 | Trip Meter | /100 | km | `MB_TripMeter` |
| 5 | 266 | unknown | — | — | TBD (logged) |
| 6 | 261 | Motor Temperature | 1 | °C | `MB_MotorTemperature` — confirmed 32°C at room temp |
| 7 | 262 | Motor Current (phase peak) | /32 | A | `MB_MotorCurrent` |
| 8 | 327 | unknown | — | — | TBD (logged) |
| 9 | 263 | Motor RPM | 1 | RPM | `MB_MotorRPM` |

> **Controller temperature** (reg 259, scale=1, °C) is not in the current subscription — add to subscription if needed.
> **Battery current** register not yet identified — candidates: reg 260, 266, 327.

### 11e. Correct Python Example (using actual protocol)

```python
import asyncio, struct
from bleak import BleakClient, BleakScanner

TX_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
RX_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

def crc16(data: bytes) -> int:
    crc = 0xFFFF
    for b in data:
        crc ^= b
        for _ in range(8):
            crc = (crc >> 1) ^ 0xA001 if crc & 1 else crc >> 1
    return crc

def fc03(addr: int, count: int) -> bytes:
    b = bytes([0x01, 0x03, addr >> 8, addr & 0xFF, count >> 8, count & 0xFF])
    c = crc16(b); return b + bytes([c & 0xFF, c >> 8])

def fc10(addr: int, values: list[int]) -> bytes:
    hdr = bytes([0x01, 0x10, addr >> 8, addr & 0xFF,
                 len(values) >> 8, len(values) & 0xFF, len(values) * 2])
    data = b''.join(bytes([v >> 8, v & 0xFF]) for v in values)
    payload = hdr + data
    c = crc16(payload); return payload + bytes([c & 0xFF, c >> 8])

POLL_REQUEST = fc03(0x0600, 5)  # read reg 1536 count=5

async def main():
    devices = await BleakScanner.discover(5.0)
    addr = next((d.address for d in devices
                 if d.name and any(k in d.name.lower() for k in ('bac','kilowatt','e-bike'))), None)
    if not addr:
        print('No BACboard found'); return

    async with BleakClient(addr) as client:
        await client.start_notify(RX_UUID, lambda _, d: print('RX:', d.hex(' ')))

        # Phase 1: handshake
        await client.write_gatt_char(TX_UUID, fc10(125, [0xa1]), response=False)
        await asyncio.sleep(0.1)
        await client.write_gatt_char(TX_UUID, fc10(125, [0x72]), response=False)
        await asyncio.sleep(0.1)

        # Phase 2: subscription setup
        await client.write_gatt_char(TX_UUID, fc10(0x0600, [265, 258, 277, 260, 408]), response=False)
        await asyncio.sleep(0.1)
        await client.write_gatt_char(TX_UUID, fc10(0x0605, [266, 261, 262, 327, 263]), response=False)
        await asyncio.sleep(0.1)

        # Phase 3: poll
        for _ in range(50):
            await client.write_gatt_char(TX_UUID, POLL_REQUEST, response=False)
            await asyncio.sleep(0.15)

asyncio.run(main())
```

---

## 12. App Architecture (old numbering kept)

```
React Native (Expo SDK 49)
  ├── BLE layer: react-native-ble-plx
  │     ├── startDeviceScan()
  │     ├── connectToDevice(id)
  │     ├── discoverAllServicesAndCharacteristics()
  │     ├── monitorCharacteristicForDevice() ← RX notify
  │     └── writeCharacteristicWithResponse() ← TX write
  ├── Protocol layer
  │     ├── serializeScaledValue(value, param)
  │     ├── deserializeScaledValue(buffer, param)
  │     ├── serializeEnumeratedValue / deserializeEnumeratedValue
  │     ├── serializeMaskedValue / deserializeMaskedValue
  │     └── Thermistor(voltage) → temperature
  ├── State
  │     ├── realtime: { vehicleSpeed, motorRpm, batteryCurrent, ... }
  │     ├── parameters: { address, value } map for all config params
  │     └── faults / warnings bitmask sets
  ├── UI
  │     ├── Live dashboard (150ms refresh)
  │     ├── Configuration tabs (Motor, Power, Sensors, etc.)
  │     └── Fault/warning display with help text
  └── Extras
        ├── Siri shortcuts for ride mode switching
        ├── Firebase push notifications (alerts)
        ├── iCloud storage for ride profiles (iOS)
        └── Datadog RUM analytics (token: pub394c3ea6f3e69fb8aeb0d3f235b1655a)
```

---

## 13. Known API Endpoints

- Expo OTA updates: `https://u.expo.dev/d5a42643-197c-4323-92ae-750ea3c65747`
- Datadog site: `US5`
- App ID: `c0bcfd20-c914-4329-8e96-114bd91f7a42`

---

## 14. Complete Parameter Register Map

Each BACboard parameter has an `address` — a 16-bit register index used directly as the index into the binary frame buffer. The frame is an array of 16-bit little-endian integers (one per register slot). The serialization functions read/write `frame[address]` as a signed 16-bit integer, scaled/enumerated/masked as described in Section 3.

Registers 779–789 are the **live telemetry** sent every 100 ms. Registers 790+ are **configuration parameters** (persistent, writable with access code). Registers 574–789 are readable real-time variables.

Full address → parameter name table (extracted from Hermes bytecode, 666 entries):

| Address | Parameter | Address | Parameter |
|---------|-----------|---------|-----------|
| 256 | rpdo3Map4Index | 257 | rpdo3Map4SubIndex |
| 258 | rpdo3Map3Index | 259 | rpdo3Map3SubIndex |
| 260 | rpdo3Map2Index | 261 | rpdo3Map2SubIndex |
| 262 | rpdo3Map1Index | 263 | rpdo3Map1SubIndex |
| 264 | teConfiguration | 265 | microElectronicsTestRegister |
| 266 | mfgTestRegister | 267 | mfgPotFunctionalTestStationSerialNumber |
| 268 | mfgPotBridgeTestStationSerialNumber | 269 | mfgAsyFunctionalTestStationSerialNumber |
| 270 | mfgAsyBridgeTestStationSerialNumber | 271 | mfgPotSerialNumber2 |
| 272 | mfgPotSerialNumber1 | 273 | mfgAsySerialNumber2 |
| 274 | mfgAsySerialNumber1 | 275 | mfgPcbaSerialNumber2 |
| 276 | mfgPcbaSerialNumber1 | 277 | mfgConfigTestStationSerialNumber |
| 278 | mfgLocationCode | 279 | mfgFlowcheck |
| 280 | mfgFirmwareFile | 281 | mfgCustomerParameterFile |
| 282 | productPartNumberRevision | 283 | productPartNumber |
| 284 | mfgFinalTestDate | 285 | mfgDateFirstPowerOn |
| 286 | customerParameter10 | 287 | customerParameter9 |
| 288 | customerParameter8 | 289 | customerParameter7 |
| 290 | customerParameter6 | 291 | customerParameter5 |
| 292 | customerParameter4 | 293 | customerParameter3 |
| 294 | customerParameter2 | 295 | customerParameter1 |
| 296 | customerParameter12 | 297 | customerParameter11 |
| 298 | variableLightOutputVoltage | 299 | i2cBusClockRate |
| 300 | openPhaseFaultThreshold | 301 | flashParameterReadAccessCode3 |
| 302 | flashParameterReadAccessCode2 | 303 | speedCalcThreshold |
| 304 | encoderOffset | 305 | encoderCosSource |
| 306 | encoderSineSource | 307 | encoderCosLowVoltage |
| 308 | encoderCosHighVoltage | 309 | encoderSineLowVoltage |
| 310 | encoderSineHighVoltage | 311 | curregKicc |
| 312 | rpmLimit | 313 | analogBrakeFaultRange |
| 314 | analogBrakeDeadbandRange | 315 | temperatureThresholdCadenceDetection |
| 316 | walkModeSpeedRegulatorKi | 317 | walkModeSpeedRegulatorKp |
| 318 | motorTempShortDetectWindow | 319 | speedRegulatorKpQ10 |
| 320 | startingSlopeForDynamicPedalRamp | 321 | endingSlopeForDynamicPedalRamp |
| 322 | walkSpeedRpm | 323 | pedalecDynamicNegativeMinRamp |
| 324 | dynamicRampPedalSpeedEnd | 325 | dynamicRampPedalSpeedStart |
| 326 | jisd9115MinimumPedalecAssistanceGain | 327 | accelerometerTiltOffset |
| 328 | accelerometerTiltSource | 329 | accelerometerInclineSource |
| 330 | reverseEnableSource | 331 | wheelLockDisableSource |
| 332 | dynameRollingStartAvoidTorque | 333 | dynameEndingPedalecGain |
| 334 | dynameStartingPedalecGain | 335 | endSpeedSetpointPedalacGain |
| 336 | midSpeedSetpointPedalacGain | 337 | noDualSpeedPulsesTimeThreshold |
| 338 | dualSpeedSensorPrimaryPulseSource | 339 | torqueSensorVoltageFilter |
| 340 | torqueSensorStaticFaultTime | 341 | torqueSensorStaticVThreshold |
| 342 | torqueSensorHighVThreshold | 343 | torqueSensorLowVThreshold |
| 344 | jisd9115MaximumPedalecAssistanceGain | 345 | jisd9115FullAssistanceSpeed |
| 346 | jisd9115VehicleMaximumSpeed | 347 | features3 |
| 348 | accelerometerSidewaysCutoffAngle | 349 | assistSpeed9 |
| 350 | assistSpeed8 | 351 | assistSpeed7 |
| 352 | assistSpeed6 | 353 | assistSpeed5 |
| 354 | assistSpeed4 | 355 | assistGain9 |
| 356 | assistGain8 | 357 | assistGain7 |
| 358 | assistGain6 | 359 | assistGain5 |
| 360 | assistGain4 | 361 | level2Spare1905 |
| 362 | level2HwBits | 363 | spare1903 |
| 364 | requestedEnding2 | 365 | requestedStarting2 |
| 366 | requestedEnding1 | 367 | requestedStarting1 |
| 368 | accelerometerAngleOffset | 369 | accelerometerAngleFilter |
| 370 | accelerometerSecondOffset | 371 | accelerometerFirstOffset |
| 372 | accelerometerSecondAngle | 373 | accelerometerFirstAngle |
| 374 | reservedParameter1892 | 375 | reservedParameter1891 |
| 376 | reservedParameter1890 | 377 | reservedParameter1889 |
| 378 | reservedParameter1888 | 379 | reservedParameter1887 |
| 380 | reservedParameter1886 | 381 | reservedParameter1885 |
| 382 | reservedParameter1884 | 383 | throttleFilterHighVoltage |
| 384 | throttleFilterSpeedControl | 385 | spare1881 |
| 386 | level1Features | 387 | tpdo4CobidHigh |
| 388 | tpdo4CobidLow | 389 | tpdo3CobidHigh |
| 390 | tpdo3CobidLow | 391 | tpdo2CobidHigh |
| 392 | tpdo2CobidLow | 393 | tpdo1CobidHigh |
| 394 | tpdo1CobidLow | 395 | rpdo2CobidHigh |
| 396 | rpdo2CobidLow | 397 | rpdo1CobidHigh |
| 398 | rpdo1CobidLow | 399 | spare1867 |
| 400 | canHeartbeatPeriod | 401 | canPostSyncLossDelay |
| 402 | canPostSleepDelay | 403 | tpdo4SyncWindow |
| 404 | tpdo4EventTime | 405 | tpdo4TransmissionType |
| 406 | tpdo4Size | 407 | tpdo4Map4Index |
| 408 | tpdo4Map4SubIndex | 409 | tpdo4Map3Index |
| 410 | tpdo4Map3SubIndex | 411 | tpdo4Map2Index |
| 412 | tpdo4Map2SubIndex | 413 | tpdo4Map1Index |
| 414 | tpdo4Map1SubIndex | 415 | tpdo3SyncWindow |
| 416 | tpdo3EventTime | 417 | tpdo3TransmissionType |
| 418 | tpdo3Size | 419 | tpdo3Map4Index |
| 420 | tpdo3Map4SubIndex | 421 | tpdo3Map3Index |
| 422 | tpdo3Map3SubIndex | 423 | tpdo3Map2Index |
| 424 | tpdo3Map2SubIndex | 425 | tpdo3Map1Index |
| 426 | tpdo3Map1SubIndex | 427 | tpdo2SyncWindow |
| 428 | tpdo2EventTime | 429 | tpdo2TransmissionType |
| 430 | tpdo2Size | 431 | tpdo2Map4Index |
| 432 | tpdo2Map4SubIndex | 433 | tpdo2Map3Index |
| 434 | tpdo2Map3SubIndex | 435 | tpdo2Map2Index |
| 436 | tpdo2Map2SubIndex | 437 | tpdo2Map1Index |
| 438 | tpdo2Map1SubIndex | 439 | tpdo1SyncWindow |
| 440 | tpdo1EventTime | 441 | tpdo1TransmissionType |
| 442 | tpdo1Size | 443 | tpdo1Map4Index |
| 444 | tpdo1Map4SubIndex | 445 | tpdo1Map3Index |
| 446 | tpdo1Map3SubIndex | 447 | tpdo1Map2Index |
| 448 | tpdo1Map2SubIndex | 449 | tpdo1Map1Index |
| 450 | tpdo1Map1SubIndex | 451 | spare1815 |
| 452 | rpdo2Timeout | 453 | rpdo2TransmissionType |
| 454 | rpdo2Size | 455 | rpdo2Map4Index |
| 456 | rpdo2Map4SubIndex | 457 | rpdo2Map3Index |
| 458 | rpdo2Map3SubIndex | 459 | rpdo2Map2Index |
| 460 | rpdo2Map2SubIndex | 461 | rpdo2Map1Index |
| 462 | rpdo2Map1SubIndex | 463 | spare1803 |
| 464 | rpdo1Timeout | 465 | rpdo1TransmissionType |
| 466 | rpdo1Size | 467 | rpdo1Map4Index |
| 468 | rpdo1Map4SubIndex | 469 | rpdo1Map3Index |
| 470 | rpdo1Map3SubIndex | 471 | rpdo1Map2Index |
| 472 | rpdo1Map2SubIndex | 473 | rpdo1Map1Index |
| 474 | rpdo1Map1SubIndex | 475 | paramLvl3CrcLow |
| 476 | paramLvl3CrcHigh | 477 | paramLvl2CrcLow |
| 478 | paramLvl2CrcHigh | 479 | paramLvl1CrcLow |
| 480 | paramLvl1CrcHigh | 481 | paramLvl0CrcLow |
| 482 | paramLvl0CrcHigh | 483 | vars21715 |
| 484 | vars21714 | 485 | i2cData |
| 486 | i2cCommand | 487 | i2cAddress |
| 488 | parameterAccessCode3 | 489 | parameterAccessCode2 |
| 490 | parameterReadAccessCode3 | 491 | parameterReadAccessCode2 |
| 492 | sectorGFlashStatus | 493 | sectorHFlashStatus |
| 494 | remotePowerLimit | 495 | powerboardTemperatureHr |
| 496 | motorTemperatureHr | 497 | batteryTemperatureOffsetQ4 |
| 498 | dspCoreTemperatureQ4 | 499 | dynamicFlashSavedVar10 |
| 500 | dynamicFlashSavedVar9 | 501 | faults2Log |
| 502 | faultsLog | 503 | dynamicFlashPacketCount |
| 504 | bootCount | 505 | powerOnTimeHigh |
| 506 | powerOnTimeLow | 507 | odometerHigh |
| 508 | odometerLow | 509 | flashSectorTracker |
| 510 | vars21688 | 511 | vars21687 |
| 512 | vars21686 | 513 | vars21685 |
| 514 | vars21684 | 515 | motorDiscoverySpeed |
| 516 | remoteRegenFoldback | 517 | remoteMotoringFoldback |
| 518 | remoteMaximumBrakingRuntime | 519 | testBuild |
| 520 | vehicleMaximumSpeedLive | 521 | remoteSpeedRpm |
| 522 | canAutoId | 523 | liveSpeedKi |
| 524 | liveSpeedKp | 525 | ptable10 |
| 526 | ptable9 | 527 | ptable8 |
| 528 | ptable7 | 529 | ptable6 |
| 530 | ptable5 | 531 | ptable4 |
| 532 | ptable3 | 533 | ptable2 |
| 534 | ptable1 | 535 | saveParameters |
| 536 | loadFirmware | 537 | parameterAccessCode1 |
| 538 | faultClear | 539 | armDatalogger |
| 540 | remoteAssistMode | 541 | remoteLightSensorVoltage |
| 542 | remoteBatteryTemperature | 543 | remoteBatterySoc |
| 544 | displayWalkStatus | 545 | displayAssistLevel |
| 546 | displaySpeedLimitCommand | 547 | bidirectionalTorqueCommand |
| 548 | parameterReadAccessCode1 | 549 | remoteAnalogBrakeVoltage |
| 550 | remoteDigitalCommands | 551 | remoteThrottleVoltage |
| 552 | remoteTorqueCommand | 553 | remoteStateCommand |
| 554 | remoteMaximumBrakingCurrent | 555 | remoteMaximumMotoringCurrent |
| 556 | remoteSpeedCommand | 557 | doNotUse4 |
| 558 | ebikeFlags2 | 559 | debugCmd2 |
| 560 | debugCmd1 | 561 | openLoopAngle |
| 562 | openLoopFrequency | 563 | openLoopCurrent |
| 564 | openLoopModulation | 565 | motorDiscoverMode |
| 566 | testMode | 567 | brakeLightPwm |
| 568 | runningLightPwm | 569 | appliedTorqueCommand |
| 570 | stateCommand | 571 | maximumBrakingCurrent |
| 572 | maximumMotoringCurrent | 573 | speedCommand |
| 574 | otpSerialNumber7 | 575 | otpSerialNumber6 |
| 576 | otpSerialNumber5 | 577 | otpSerialNumber4 |
| 578 | otpSerialNumber3 | 579 | otpSerialNumber2 |
| 580 | otpSerialNumber1 | 581 | otpSerialNumber0 |
| 582 | rollingStartSpeedAssistMode | 583 | axleTorqueSensorAssist |
| 584 | autotuneRatedRpm | 585 | autotuneKv |
| 586 | autotuneHallOffsetAngle | 587 | averageBackgroundPeriod |
| 588 | peakBackgroundPeriod | 589 | regenLimitPrefoldback |
| 590 | motoringLimitPrefoldback | 591 | siliconVersion |
| 592 | applicationCrc32LowWord | 593 | applicationCrc32HighWord |
| 594 | bootloaderCrc32LowWord | 595 | bootloaderCrc32HighWord |
| 596 | userAccessLevel | 597 | parameterCrc32LowWord |
| 598 | parameterCrc32HighWord | 599 | autotuneHallSector7 |
| 600 | autotuneHallSector6 | 601 | autotuneHallSector5 |
| 602 | autotuneHallSector4 | 603 | autotuneHallSector3 |
| 604 | autotuneHallSector2 | 605 | autotuneHallSector1 |
| 606 | autotuneHallSector0 | 607 | pwmCmdCPwm |
| 608 | pwmCmdBPwm | 609 | pwmCmdAPwm |
| 610 | modulationIndex | 611 | iqTrimQ12 |
| 612 | icRms | 613 | iaRms |
| 614 | flashParameterCycleCounter | 615 | combinedMotorThermalFoldback |
| 616 | digitalInputs2 | 617 | ratedElectricalFrequency |
| 618 | puLs | 619 | puRs |
| 620 | autotuneLs | 621 | autotuneRs |
| 622 | autotuneLm | 623 | idRefFdfwd |
| 624 | idRefTrim | 625 | dLimit |
| 626 | qLimit | 627 | hallFrequency |
| 628 | lastFaults2 | 629 | hallAngle |
| 630 | pllReferenceAngle | 631 | rotorFrequency |
| 632 | pllIntegral | 633 | pllProportional |
| 634 | pllFrequency | 635 | pllError |
| 636 | pllAngle | 637 | pedalecTimeoutDelay |
| 638 | tripMeter | 639 | wheelPulseCounter |
| 640 | doNotUse3 | 641 | doNotUse2 |
| 642 | doNotUse1 | 643 | parameterWriteAccessCode |
| 644 | debug2 | 645 | debug1 |
| 646 | puLm | 647 | motorTemperatureSensorVoltage |
| 648 | calculatedBatteryCurrentBrakingLimit | 649 | calculatedBatteryCurrentMotoringLimit |
| 650 | instantaneousOpenLoopAngle | 651 | fluxAngle |
| 652 | fluxMagnitude | 653 | fluxFrequency |
| 654 | fluxBeta | 655 | fluxAlpha |
| 656 | statorCurrentBeta | 657 | statorCurrentAlpha |
| 658 | batteryNegativeFoldbackCurrentLimit | 659 | batteryPositiveFoldbackCurrentLimit |
| 660 | maximumMeasurableVoltage | 661 | maximumMeasurableCurrent |
| 662 | qAxisCurrentReference | 663 | dAxisCurrentReference |
| 664 | qAxisCurrentFeedback | 665 | dAxisCurrentFeedback |
| 666 | batteryI2tFoldbackGain | 667 | qAxisLimit |
| 668 | qAxisCurrentProportionalTerm | 669 | dAxisCurrentProportionalTerm |
| 670 | qAxisCurrentError | 671 | dAxisCurrentError |
| 672 | qAxisCurrentOutput | 673 | dAxisCurrentOutput |
| 674 | qAxisCurrentIntegralTerm | 675 | dAxisCurrentIntegralTerm |
| 676 | speedRegulatorProportionalTerm | 677 | speedRegulatorErrorTerm |
| 678 | speedRegulatorOutput | 679 | speedRegulatorIntegralTerm |
| 680 | customCodeExecutionTime11 | 681 | customCodeCrcLow |
| 682 | customCodeCrcHigh | 683 | executionTime11 |
| 684 | remoteMaximumRegenBatteryCurrentLimit | 685 | remoteMaximumBatteryCurrentLimit |
| 686 | warnings2 | 687 | executionTime7 |
| 688 | executionTime6 | 689 | executionTime5 |
| 690 | executionTime4 | 691 | executionTime |
| 692 | averageExecutionTime | 693 | peakExecutionTime |
| 694 | peakIsrExecutionTime | 695 | currentIsrExecutionTime |
| 696 | axleTorqueSensorOffsetVoltage | 697 | qFeedbackAvg |
| 698 | dFeedbackAvg | 699 | filteredQAxisVoltage |
| 700 | filteredDAxisVoltage | 701 | reserved344 |
| 702 | modbus2HwErrors | 703 | modbus2CrcErrorCount |
| 704 | modbus1HwErrors | 705 | modbus1CrcErrorCount |
| 706 | assistLevel | 707 | pedalSpeedGain |
| 708 | speedLimit | 709 | torqueReference |
| 710 | requestedTorqueCommand | 711 | motorInputPower |
| 712 | regenPhaseCurrentLimit | 713 | averagePedalTorque |
| 714 | averagePedalSpeed | 715 | sensorlessState |
| 716 | assistSpeedLimit | 717 | instantaneousPedalSpeed |
| 718 | ebikeFlags | 719 | brakeSetpoint |
| 720 | throttleSetpoint | 721 | lowSocFoldbackGain |
| 722 | motoringPhaseCurrentLimit | 723 | speedLimiterOutput |
| 724 | inverterTemperatureFoldbackGain | 725 | motorTemperatureFoldbackGain |
| 726 | motorI2tFoldbackGain | 727 | phaseMotoringCurrentPowerLimit |
| 728 | lowVoltageFoldbackGain | 729 | phaseCCurrentSensorOffset |
| 730 | phaseACurrentSensorOffset | 731 | localPowerLimitCommand |
| 732 | measuredWheelRpm | 733 | motorWheelRpm |
| 734 | speedSensorWheelRpm | 735 | highVoltageFoldbackGain |
| 736 | phaseRegenCurrentPowerLimit | 737 | postStaticPhaseWOpenVoltage |
| 738 | postStaticPhaseVOpenVoltage | 739 | postStaticPhaseUOpenVoltage |
| 740 | postDynamicPhaseWLowVoltage | 741 | postDynamicPhaseWHighVoltage |
| 742 | postDynamicPhaseVLowVoltage | 743 | postDynamicPhaseVHighVoltage |
| 744 | postDynamicPhaseULowVoltage | 745 | postDynamicPhaseUHighVoltage |
| 746 | faults2 | 747 | overloadAccumulator |
| 748 | icPu | 749 | iaPu |
| 750 | digitalOutputs | 751 | instantaneousPhaseCVoltage |
| 752 | instantaneousPhaseBVoltage | 753 | instantaneousPhaseAVoltage |
| 754 | rawBatteryVoltage | 755 | highSocFoldbackGain |
| 756 | twelveVoltSupplyVoltage | 757 | bootloaderSoftwareVersion |
| 758 | phaseCVoltage | 759 | phaseBVoltage |
| 760 | phaseAVoltage | 761 | phaseCCurrent |
| 762 | phaseBCurrent | 763 | phaseACurrent |
| 764 | dspCoreTemperature | 765 | batteryPowerPercent |
| 766 | batteryTemperature | 767 | motorElectricalPosition |
| 768 | warnings | 769 | digitalInputs |
| 770 | analogBmsSocVoltage | 771 | lightSensorVoltage |
| 772 | rawPowerboardTemperatureSensorVoltage | 773 | brake2Voltage |
| 774 | brake1Voltage | 775 | throttleVoltage |
| 776 | lastFault | 777 | batteryPower |
| **778** | **batteryStateOfCharge** | **779** | **batteryCurrent** |
| **780** | **batteryVoltage** | **781** | **percentOfRatedRpm** |
| **782** | **motorRpm** | **783** | **motorCurrent** |
| **784** | **motorTemperature** | **785** | **vehicleSpeed** |
| **786** | **powerboardTemperature** | **787** | **faults** |
| **788** | **controllerStatus** | **789** | **softwareVersion** |
| 790 | canSyncLossTimeout | 791 | speedLimitRampTime |
| 792 | assistGainWalk | 793 | vehicleJogSpeed2 |
| 794 | assistSpeed3 | 795 | assistGain3 |
| 796 | regenBrakeSource | 797 | cutoffBrakeSensorSource |
| 798 | throttleSensorSource | 799 | assistSpeed2 |
| 800 | assistGain2 | 801 | digitalThrottleSensorSource |
| 802 | voltageThresholdSingleSpeedTemperatureSource | 803 | torqueSensorVoltageSource |
| 804 | assistSpeed1 | 805 | modelDictionaryNumberHigh |
| 806 | modelDictionaryNumberLow | 807 | mfgBarcodeType |
| 808 | mfgFlowCheck | 809 | vehicleMaximumSpeedStreetModeThrottle |
| 810 | pedalSenseDelay | 811 | pedalSpeedSensorPulsesPerRevolution |
| 812 | pedalecMaximumTimeout | 813 | pedalecMinimumTimeout |
| 814 | wheelSpeedSensorPulsesPerRevolution | 815 | vehicleJogSpeed |
| 816 | vehicleMaximumSpeedRaceModeThrottle | 817 | assistCutOutDistance |
| 818 | wheelDiameter | 819 | gearRatio |
| 820 | negativeBrakingTorqueRamp | 821 | positiveBrakingTorqueRamp |
| 822 | pedalecNegativeMotoringTorqueRamp | 823 | pedalecPositiveMotoringTorqueRamp |
| 824 | negativeMotoringTorqueRamp | 825 | positiveMotoringTorqueRamp |
| 826 | assistGain1 | 827 | assistLowVoltageReading |
| 828 | assistHighVoltageReading | 829 | analogBrakeOffVoltage |
| 830 | analogBrakeFullVoltage | 831 | throttleOffVoltage |
| 832 | throttleFullVoltage | 833 | features |
| 834 | pedalSensorType | 835 | assistModeSource |
| 836 | batteryManagementInterfaceType | 837 | controlCommandSource |
| 838 | customerReserved207 | 839 | regenBrakeSpeed |
| 840 | rollingStartSpeed | 841 | rollingStartSpeed3 |
| 842 | rollingStartSpeed2 | 843 | rollingStartSpeed1 |
| 844 | axleTorqueSensor3 | 845 | axleTorqueSensor2 |
| 846 | axleTorqueSensor1 | 847 | voltageModelSocOffset |
| 848 | voltageModelSocGain | 849 | lowBatterySocAlarmThreshold |
| 850 | highBatteryFoldbackEndVoltage | 851 | highBatteryFoldbackStartingVoltage |
| 852 | wheelSpeedSensorSource | 853 | datalogTriggerMode |
| 854 | datalogTimebase | 855 | datalogHoldOff |
| 856 | datalogTriggerMask | 857 | datalogTriggerLevel |
| 858 | datalogChannel4Select | 859 | datalogChannel3Select |
| 860 | datalogChannel2Select | 861 | datalogChannel1Select |
| 862 | torqueSensorGain | 863 | torqueSensorOffset |
| 864 | pedalecDeadbandTorque | 865 | pedalecInitialTorque |
| 866 | pedalecPowerGain | 867 | pedalecTorqueSymmetry |
| 868 | engineBrakingTorque | 869 | pedalSpeedMapEnd |
| 870 | pedalSpeedMapOffset | 871 | features2 |
| 872 | minimumMotoringTorque | 873 | powerMapSpeedSetpoint8 |
| 874 | powerMapSpeedSetpoint7 | 875 | powerMapSpeedSetpoint6 |
| 876 | powerMapSpeedSetpoint5 | 877 | powerMapSpeedSetpoint4 |
| 878 | powerMapSpeedSetpoint3 | 879 | powerMapSpeedSetpoint2 |
| 880 | powerMapSpeedSetpoint1 | 881 | powerMapWattSetpoint8 |
| 882 | powerMapWattSetpoint7 | 883 | powerMapWattSetpoint6 |
| 884 | powerMapWattSetpoint5 | 885 | powerMapWattSetpoint4 |
| 886 | powerMapWattSetpoint3 | 887 | powerMapWattSetpoint2 |
| 888 | powerMapWattSetpoint1 | 889 | regenBatteryCurrentLimit |
| 890 | batteryCurrentLimit | 891 | maximumBrakingTorque |
| 892 | reserved153 | 893 | throttleFaultRange |
| 894 | throttleDeadbandThreshold | 895 | averageUnderVoltageThreshold |
| 896 | averageOverVoltageThreshold | 897 | instantaneousUnderVoltageThreshold |
| 898 | instantaneousOverVoltageThreshold | 899 | lowBatterySocFoldbackEnd |
| 900 | lowBatterySocFoldbackStart | 901 | coldBatteryFoldbackEndTemperature |
| 902 | coldBatteryFoldbackStartTemperature | 903 | lowBatteryVoltageFoldbackEndVoltage |
| 904 | lowBatteryVoltageFoldbackStartVoltage | 905 | alternateSpeedLimitSwitchSource |
| 906 | alternatePowerSwitchSource | 907 | walkModeSignalSource |
| 908 | motorTemperatureSource | 909 | batteryRegenHighSocFoldbackEnd |
| 910 | batteryRegenHighSocFoldbackStart | 911 | pedalecSensorlessClosedLoopEnableFrequency |
| 912 | pedalecSensorlessOpenLoopFreqRampTime | 913 | pedalecSensorlessOpenLoopStartingCurrent |
| 914 | ratedMotorPowerStreetModeThrottlePower | 915 | flashParameterWriteAccessCode |
| 916 | maximumFieldWeakeningCurrent | 917 | hallInterpolationTransitions |
| 918 | motorFeatures | 919 | bluetoothTestParameter |
| 920 | customerParameterVersion | 921 | vehicleMaximumSpeedRaceModePas |
| 922 | vehicleMaximumSpeedStreetModePas | 923 | ratedMotorPowerRaceModePasPower |
| 924 | ratedMotorPowerStreetModePasPower | 925 | batteryAssistLowerRange |
| 926 | startFreeWheelHallTransitions | 927 | speedModeRegenRamp |
| 928 | throttleSensitivityMotorSpeed | 929 | speedModePositiveAccelerationRamp |
| 930 | singlePushAssistBoostTimer | 931 | singlePushAssistSource |
| 932 | displayLanguage | 933 | batteryUpperRange |
| 934 | sensorlessOpenLoopDcCurrentHoldTime | 935 | sensorlessOpenLoopFreqRampTime |
| 936 | sensorlessClosedLoopEnableFrequency | 937 | sensorlessOpenLoopInjectionCurrentRampTime |
| 938 | sensorlessOpenLoopStartingCurrent | 939 | overloadFoldbackEnd |
| 940 | overloadFoldbackStart | 941 | overloadCoolingTime |
| 942 | overloadCoolingCurrent | 943 | overloadHeatingTime |
| 944 | overloadHeatingCurrent | 945 | overloadContinousCurrent |
| 946 | temperatureFeedback125C | 947 | temperatureFeedback100C |
| 948 | temperatureFeedback75C | 949 | temperatureFeedback50C |
| 950 | temperatureFeedback25C | 951 | temperatureFeedback0C |
| 952 | motorFoldbackEndingTemperature | 953 | motorFoldbackStartingTemperature |
| 954 | motorOverTemperatureTripThreshold | 955 | hallInterpolationStopFrequency |
| 956 | hallInterpolationStartFrequency | 957 | hallSector7 |
| 958 | hallSector6 | 959 | hallSector5 |
| 960 | hallSector4 | 961 | hallSector3 |
| 962 | hallSector2 | 963 | hallSector1 |
| 964 | hallSector0 | 965 | hallOffset |
| 966 | polePairs | 967 | motorPositionSensorType |
| 968 | displayProtocol2 | 969 | rs |
| 970 | ls | 971 | ratedMotorPowerRaceModeThrottlePower |
| 972 | ratedMotorSpeed | 973 | ratedMotorCurrent |
| 974 | ratedSystemVoltage | 975 | lm |
| 976 | kpAntiTheft | 977 | parameterUpdateSoftwareVersion |
| 978 | displayProtocol | 979 | port2SlaveId |
| 980 | port2BaudRate | 981 | hallStallFaultTime |
| 982 | flashParameterReadAccessCode1 | 983 | newPhaseCCurrentGain |
| 984 | newPhaseACurrentGain | 985 | batteryResistance |
| 986 | communicationsConfigurationVector | 987 | canId |
| 988 | canBaudRate | 989 | pllKi |
| 990 | pllKp | 991 | pllDamping |
| 992 | pllBandwidth | 993 | currentRegulatorBandwidth |
| 994 | remoteCommLossBrakingCurrentLimit | 995 | averageCommandTimeoutThreshold |
| 996 | postDynamicVoltageTestLimits | 997 | postStaticVoltageTestLimits |
| 998 | kdAntiTheft | 999 | antitheftEnableTime |
| 1000 | smtSerialNumber | 1001 | smtDatecode |
| 1002 | controllerTemperatureFeedback125C | 1003 | controllerTemperatureFeedback100C |
| 1004 | controllerTemperatureFeedback75C | 1005 | controllerTemperatureFeedback50C |
| 1006 | controllerTemperatureFeedback25C | 1007 | controllerTemperatureFeedback0C |
| 1008 | controllerFoldbackEndingTemperature | 1009 | controllerFoldbackStartingTemperature |
| 1010 | heatsinkOverTemperatureTripThreshold | 1011 | dcVoltageTripClearHysterisis |
| 1012 | commandTimeoutThreshold | 1013 | maximumInterruptExecutionTime |
| 1014 | phaseCurrentRmsFilterShift | 1015 | instantaneousOverCurrentTripThreshold |
| 1016 | averagedOverCurrentTripSampleLength | 1017 | averagedOverCurrentTripThreshold |
| 1018 | voltageFeedbackFilterCutoffFrequency | 1019 | fluxFrequencyFilterShift |
| 1020 | fluxHpfShift | 1021 | fluxFilterShift |
| 1022 | dqAxisFilterShift | 1023 | temperatureFilterShift |
| 1024 | dcVoltageFilterShift | 1025 | bmsGain |
| 1026 | brakeGain | 1027 | throttleGain |
| 1028 | phaseCCurrentGain | 1029 | voltageGain |
| 1030 | phaseACurrentGain | 1031 | pllKiOld |
| 1032 | pllKpOld | 1033 | speedRegulatorMode |
| 1034 | speedRegulatorKi | 1035 | speedRegulatorKp |
| 1036 | currentRegulatorKi | 1037 | currentRegulatorKp |
| 1038 | hwConfigurationVector | 1039 | slaveId |
| 1040 | baudRate | 1041 | deadTime |
| 1042 | switchingFrequency | 1043 | inputVoltageRating |
| 1044 | outputCurrentRating | | |

**Bold** rows (778–789) are the primary real-time telemetry registers polled every 100 ms.

### Frame Wire Format

The BLE notification payload is a binary array of 16-bit little-endian integers. To read register `N`:

```python
import struct

def read_register(frame_bytes: bytes, address: int) -> int:
    """Read signed 16-bit integer at register address N from BLE frame."""
    offset = address * 2
    return struct.unpack_from('<h', frame_bytes, offset)[0]

# Example: read vehicleSpeed (register 785)
speed_raw = read_register(frame, 785)
speed_kmh = speed_raw * scale_factor  # scale from parameter definition
```

The frame size is at minimum `(max_address + 1) * 2` bytes. For a full telemetry snapshot the BACboard sends packets covering registers 574–789 (or the full 1044-register block for configuration reads).
