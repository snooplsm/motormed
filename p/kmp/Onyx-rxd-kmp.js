(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Onyx:rxd-kmp'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Onyx:rxd-kmp'.");
    }
    globalThis['Onyx:rxd-kmp'] = factory(typeof globalThis['Onyx:rxd-kmp'] === 'undefined' ? {} : globalThis['Onyx:rxd-kmp'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var sortedWith = kotlin_kotlin.$_$.l;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.g;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.b;
  var Unit_instance = kotlin_kotlin.$_$.f;
  var copyToArray = kotlin_kotlin.$_$.j;
  var protoOf = kotlin_kotlin.$_$.w;
  var equals = kotlin_kotlin.$_$.p;
  var FunctionAdapter = kotlin_kotlin.$_$.n;
  var isInterface = kotlin_kotlin.$_$.v;
  var Comparator = kotlin_kotlin.$_$.d1;
  var hashCode = kotlin_kotlin.$_$.s;
  var initMetadataForClass = kotlin_kotlin.$_$.t;
  var VOID = kotlin_kotlin.$_$.a;
  var compareValues = kotlin_kotlin.$_$.m;
  var initMetadataForObject = kotlin_kotlin.$_$.u;
  var to = kotlin_kotlin.$_$.i1;
  var mapOf = kotlin_kotlin.$_$.k;
  var toLong = kotlin_kotlin.$_$.y;
  var Long = kotlin_kotlin.$_$.f1;
  var defineProp = kotlin_kotlin.$_$.o;
  var getNumberHashCode = kotlin_kotlin.$_$.q;
  var getStringHashCode = kotlin_kotlin.$_$.r;
  var THROW_CCE = kotlin_kotlin.$_$.g1;
  var toString = kotlin_kotlin.$_$.a1;
  var toByte = kotlin_kotlin.$_$.x;
  var Enum = kotlin_kotlin.$_$.e1;
  var toString_0 = kotlin_kotlin.$_$.h1;
  var contentEquals = kotlin_kotlin.$_$.h;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.d;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.c;
  var toString_1 = kotlin_kotlin.$_$.c1;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.e;
  var copyOfRange = kotlin_kotlin.$_$.i;
  var toShort = kotlin_kotlin.$_$.z;
  var decodeToString = kotlin_kotlin.$_$.b1;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForObject(RxdControllerFlagsBridge, 'RxdControllerFlagsBridge');
  initMetadataForObject(ControllerFlags, 'ControllerFlags');
  initMetadataForObject(RxdFlagsBitmask, 'RxdFlagsBitmask');
  initMetadataForClass(JsRxdHeader, 'JsRxdHeader');
  initMetadataForClass(JsRxdRecord, 'JsRxdRecord');
  initMetadataForClass(JsRxdFile, 'JsRxdFile');
  initMetadataForObject(RxdJsBridge, 'RxdJsBridge');
  initMetadataForObject(RxdSharedFormat, 'RxdSharedFormat');
  initMetadataForClass(RxdRecordType, 'RxdRecordType', VOID, Enum);
  initMetadataForClass(RxdHeader, 'RxdHeader');
  initMetadataForClass(RxdTelemetry, 'RxdTelemetry', RxdTelemetry);
  initMetadataForClass(RxdGps, 'RxdGps', RxdGps);
  initMetadataForClass(RxdGyro, 'RxdGyro', RxdGyro);
  initMetadataForClass(RxdEvent, 'RxdEvent');
  initMetadataForClass(RxdRecord, 'RxdRecord');
  initMetadataForClass(RxdFile, 'RxdFile');
  initMetadataForObject(RxdCodec, 'RxdCodec');
  initMetadataForClass(ByteReader, 'ByteReader');
  //endregion
  function labelEntries($this, labelsByBit) {
    // Inline function 'kotlin.collections.sortedBy' call
    var this_0 = labelsByBit.p();
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = RxdControllerFlagsBridge$labelEntries$lambda;
    var tmp$ret$0 = new sam$kotlin_Comparator$0(tmp);
    // Inline function 'kotlin.collections.map' call
    var this_1 = sortedWith(this_0, tmp$ret$0);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s = this_1.c();
    while (_iterator__ex2g4s.d()) {
      var item = _iterator__ex2g4s.e();
      // Inline function 'kotlin.collections.component1' call
      var bit = item.l();
      // Inline function 'kotlin.collections.component2' call
      var label = item.m();
      var tmp$ret$4 = '' + bit + '|' + (bit >= 32 ? 1 : 0) + '|' + label;
      destination.h(tmp$ret$4);
    }
    // Inline function 'kotlin.collections.toTypedArray' call
    return copyToArray(destination);
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.b5_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).p4 = function (a, b) {
    return this.b5_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.p4(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).k1 = function () {
    return this.b5_1;
  };
  protoOf(sam$kotlin_Comparator$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.k1(), other.k1());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0).hashCode = function () {
    return hashCode(this.k1());
  };
  function RxdControllerFlagsBridge$labelEntries$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = a.l();
    var tmp$ret$1 = b.l();
    return compareValues(tmp, tmp$ret$1);
  }
  function RxdControllerFlagsBridge() {
  }
  protoOf(RxdControllerFlagsBridge).kellyLabels = function () {
    return ControllerFlags_getInstance().f5_1;
  };
  protoOf(RxdControllerFlagsBridge).kellyLabelCount = function () {
    return ControllerFlags_getInstance().f5_1.length;
  };
  protoOf(RxdControllerFlagsBridge).kellyLabelAt = function (index) {
    return ControllerFlags_getInstance().f5_1[index];
  };
  protoOf(RxdControllerFlagsBridge).kellyStatusBitCount = function () {
    return 11;
  };
  protoOf(RxdControllerFlagsBridge).bacLabelEntries = function () {
    return labelEntries(this, ControllerFlags_getInstance().g5_1);
  };
  protoOf(RxdControllerFlagsBridge).farDriverLabelEntries = function () {
    return labelEntries(this, ControllerFlags_getInstance().h5_1);
  };
  protoOf(RxdControllerFlagsBridge).vescLabelEntries = function () {
    return labelEntries(this, ControllerFlags_getInstance().i5_1);
  };
  protoOf(RxdControllerFlagsBridge).composeFlags = function (errorFlags, statusFlags) {
    return RxdFlagsBitmask_instance.j5(errorFlags, statusFlags).j1();
  };
  var RxdControllerFlagsBridge_instance;
  function RxdControllerFlagsBridge_getInstance() {
    return RxdControllerFlagsBridge_instance;
  }
  function ControllerFlags() {
    ControllerFlags_instance = this;
    this.c5_1 = 16;
    this.d5_1 = 11;
    this.e5_1 = 24;
    var tmp = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.f5_1 = ['Brake Active', 'Foot Switch', 'Forward Switch', 'Reverse', 'Hall Sensor A', 'Hall Sensor B', 'Hall Sensor C', 'Setting Direction', 'Actual Direction', 'Brake Switch', 'Low Speed', 'Identify Error', 'Over Voltage', 'Low Voltage', 'Locking', 'V+ Error', 'Controller Hot', 'High Throttle', 'Reset Error', 'Throttle Fault', 'Hall Sensor Fault', 'Reverse Error', 'Motor Hot', 'Current Meter Error'];
    this.g5_1 = mapOf([to(0, 'Overcurrent'), to(1, 'Overvoltage'), to(2, 'Undervoltage'), to(3, 'Controller Over Temp'), to(4, 'Motor Over Temp'), to(5, 'Hall Sensor Fault'), to(6, 'Throttle Fault'), to(7, 'Brake Fault'), to(8, 'Current Sensor Fault'), to(9, 'Comm Timeout'), to(10, 'Hardware Fault'), to(11, 'Speed Sensor Fault'), to(12, 'Parameter Fault'), to(13, 'Stall Fault'), to(14, 'Battery Temp Fault'), to(15, 'Reserved'), to(32, 'Over Temp Warn'), to(33, 'High Voltage Warn'), to(34, 'Low Voltage Warn'), to(35, 'Motor Temp Warn'), to(36, 'Current Limit'), to(37, 'Speed Limit'), to(38, 'Low Battery Warn'), to(39, 'Comm Warning')]);
    this.h5_1 = mapOf([to(0, 'Motor hall'), to(1, 'Throttle'), to(2, 'Current protect restart'), to(3, 'Phase current surge'), to(4, 'Voltage protect'), to(5, 'Alarm protect'), to(6, 'Motor temp protect'), to(7, 'Controller temp protect'), to(8, 'Phase current overflow'), to(9, 'Phase zero'), to(10, 'Phase short/lost'), to(11, 'Line current zero'), to(12, 'MOSFET high side'), to(13, 'MOSFET low side'), to(14, 'MOE current protect'), to(15, 'Brake alarm'), to(32, 'Reverse'), to(33, 'Rolling'), to(34, 'Motor stopped'), to(35, 'Rolling forward'), to(36, 'Rolling reverse'), to(37, 'Weak mode'), to(38, 'EABS'), to(39, 'Auto learn'), to(40, 'Motor running'), to(41, 'Pass OK'), to(42, 'Phone OK'), to(43, 'Old BLE')]);
    this.i5_1 = mapOf([to(1, 'Over voltage'), to(2, 'Under voltage'), to(3, 'DRV fault'), to(4, 'ABS over current'), to(5, 'Over temp FET'), to(6, 'Over temp motor'), to(7, 'Gate driver over voltage'), to(8, 'Gate driver under voltage'), to(9, 'MCU under voltage'), to(10, 'Booting from watchdog'), to(11, 'Encoder SPI'), to(12, 'Encoder SINCOS below min amp'), to(13, 'Encoder SINCOS above max amp'), to(14, 'Flash corruption'), to(15, 'High offset current sensor 1'), to(16, 'High offset current sensor 2'), to(17, 'High offset current sensor 3'), to(18, 'Unbalanced currents'), to(19, 'Brake resistor'), to(20, 'Resolver loss of tracking'), to(21, 'Resolver degradation of signal'), to(22, 'Resolver loss of signal'), to(23, 'App config flash corruption'), to(24, 'Motor config flash corruption'), to(25, 'Encoder no magnet'), to(26, 'Encoder magnet too strong'), to(27, 'Phase filter'), to(28, 'Encoder fault')]);
  }
  var ControllerFlags_instance;
  function ControllerFlags_getInstance() {
    if (ControllerFlags_instance == null)
      new ControllerFlags();
    return ControllerFlags_instance;
  }
  function RxdFlagsBitmask() {
  }
  protoOf(RxdFlagsBitmask).j5 = function (errorFlags, statusFlags) {
    var e = toLong(errorFlags).f1(new Long(-1, 0));
    var s = toLong(statusFlags).f1(new Long(-1, 0));
    return e.g1(s.e1(32));
  };
  var RxdFlagsBitmask_instance;
  function RxdFlagsBitmask_getInstance() {
    return RxdFlagsBitmask_instance;
  }
  function JsRxdHeader(version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion) {
    this.version = version;
    this.contentFlags = contentFlags;
    this.recordingId = recordingId;
    this.startTimeMs = startTimeMs;
    this.endTimeMs = endTimeMs;
    this.controllerId = controllerId;
    this.bmsId = bmsId;
    this.device = device;
    this.modelName = modelName;
    this.firmwareVersion = firmwareVersion;
  }
  protoOf(JsRxdHeader).k5 = function () {
    return this.version;
  };
  protoOf(JsRxdHeader).l5 = function () {
    return this.contentFlags;
  };
  protoOf(JsRxdHeader).m5 = function () {
    return this.recordingId;
  };
  protoOf(JsRxdHeader).n5 = function () {
    return this.startTimeMs;
  };
  protoOf(JsRxdHeader).o5 = function () {
    return this.endTimeMs;
  };
  protoOf(JsRxdHeader).p5 = function () {
    return this.controllerId;
  };
  protoOf(JsRxdHeader).q5 = function () {
    return this.bmsId;
  };
  protoOf(JsRxdHeader).r5 = function () {
    return this.device;
  };
  protoOf(JsRxdHeader).s5 = function () {
    return this.modelName;
  };
  protoOf(JsRxdHeader).t5 = function () {
    return this.firmwareVersion;
  };
  protoOf(JsRxdHeader).w4 = function () {
    return this.version;
  };
  protoOf(JsRxdHeader).x4 = function () {
    return this.contentFlags;
  };
  protoOf(JsRxdHeader).u5 = function () {
    return this.recordingId;
  };
  protoOf(JsRxdHeader).v5 = function () {
    return this.startTimeMs;
  };
  protoOf(JsRxdHeader).w5 = function () {
    return this.endTimeMs;
  };
  protoOf(JsRxdHeader).x5 = function () {
    return this.controllerId;
  };
  protoOf(JsRxdHeader).y5 = function () {
    return this.bmsId;
  };
  protoOf(JsRxdHeader).z5 = function () {
    return this.device;
  };
  protoOf(JsRxdHeader).a6 = function () {
    return this.modelName;
  };
  protoOf(JsRxdHeader).b6 = function () {
    return this.firmwareVersion;
  };
  protoOf(JsRxdHeader).c6 = function (version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion) {
    return new JsRxdHeader(version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion);
  };
  protoOf(JsRxdHeader).copy = function (version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion, $super) {
    version = version === VOID ? this.version : version;
    contentFlags = contentFlags === VOID ? this.contentFlags : contentFlags;
    recordingId = recordingId === VOID ? this.recordingId : recordingId;
    startTimeMs = startTimeMs === VOID ? this.startTimeMs : startTimeMs;
    endTimeMs = endTimeMs === VOID ? this.endTimeMs : endTimeMs;
    controllerId = controllerId === VOID ? this.controllerId : controllerId;
    bmsId = bmsId === VOID ? this.bmsId : bmsId;
    device = device === VOID ? this.device : device;
    modelName = modelName === VOID ? this.modelName : modelName;
    firmwareVersion = firmwareVersion === VOID ? this.firmwareVersion : firmwareVersion;
    return $super === VOID ? this.c6(version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion) : $super.c6.call(this, version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion);
  };
  protoOf(JsRxdHeader).toString = function () {
    return 'JsRxdHeader(version=' + this.version + ', contentFlags=' + this.contentFlags + ', recordingId=' + this.recordingId + ', startTimeMs=' + this.startTimeMs + ', endTimeMs=' + this.endTimeMs + ', controllerId=' + this.controllerId + ', bmsId=' + this.bmsId + ', device=' + this.device + ', modelName=' + this.modelName + ', firmwareVersion=' + this.firmwareVersion + ')';
  };
  protoOf(JsRxdHeader).hashCode = function () {
    var result = this.version;
    result = imul(result, 31) + this.contentFlags | 0;
    result = imul(result, 31) + getNumberHashCode(this.recordingId) | 0;
    result = imul(result, 31) + getNumberHashCode(this.startTimeMs) | 0;
    result = imul(result, 31) + getNumberHashCode(this.endTimeMs) | 0;
    result = imul(result, 31) + getNumberHashCode(this.controllerId) | 0;
    result = imul(result, 31) + getNumberHashCode(this.bmsId) | 0;
    result = imul(result, 31) + (this.device == null ? 0 : getStringHashCode(this.device)) | 0;
    result = imul(result, 31) + (this.modelName == null ? 0 : getStringHashCode(this.modelName)) | 0;
    result = imul(result, 31) + (this.firmwareVersion == null ? 0 : getStringHashCode(this.firmwareVersion)) | 0;
    return result;
  };
  protoOf(JsRxdHeader).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof JsRxdHeader))
      return false;
    var tmp0_other_with_cast = other instanceof JsRxdHeader ? other : THROW_CCE();
    if (!(this.version === tmp0_other_with_cast.version))
      return false;
    if (!(this.contentFlags === tmp0_other_with_cast.contentFlags))
      return false;
    if (!equals(this.recordingId, tmp0_other_with_cast.recordingId))
      return false;
    if (!equals(this.startTimeMs, tmp0_other_with_cast.startTimeMs))
      return false;
    if (!equals(this.endTimeMs, tmp0_other_with_cast.endTimeMs))
      return false;
    if (!equals(this.controllerId, tmp0_other_with_cast.controllerId))
      return false;
    if (!equals(this.bmsId, tmp0_other_with_cast.bmsId))
      return false;
    if (!(this.device == tmp0_other_with_cast.device))
      return false;
    if (!(this.modelName == tmp0_other_with_cast.modelName))
      return false;
    if (!(this.firmwareVersion == tmp0_other_with_cast.firmwareVersion))
      return false;
    return true;
  };
  function JsRxdRecord(type, timeMs, motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm, lat, lng, speed, altitude, bearing, accuracy, gyroX, gyroY, gyroZ, gyroAccuracy, gyroType, gyroOrientation, eventType) {
    this.type = type;
    this.timeMs = timeMs;
    this.motorTemp = motorTemp;
    this.controllerTemp = controllerTemp;
    this.batteryCurrent = batteryCurrent;
    this.batteryVoltage = batteryVoltage;
    this.rpm = rpm;
    this.throttlePercent = throttlePercent;
    this.batteryTemp = batteryTemp;
    this.flagsBitmask = flagsBitmask;
    this.phaseCurrent = phaseCurrent;
    this.brakePercent = brakePercent;
    this.speedKph = speedKph;
    this.phaseCurrentA = phaseCurrentA;
    this.phaseCurrentC = phaseCurrentC;
    this.controllerSoc = controllerSoc;
    this.gear = gear;
    this.odometerKm = odometerKm;
    this.lat = lat;
    this.lng = lng;
    this.speed = speed;
    this.altitude = altitude;
    this.bearing = bearing;
    this.accuracy = accuracy;
    this.gyroX = gyroX;
    this.gyroY = gyroY;
    this.gyroZ = gyroZ;
    this.gyroAccuracy = gyroAccuracy;
    this.gyroType = gyroType;
    this.gyroOrientation = gyroOrientation;
    this.eventType = eventType;
  }
  protoOf(JsRxdRecord).d6 = function () {
    return this.type;
  };
  protoOf(JsRxdRecord).e6 = function () {
    return this.timeMs;
  };
  protoOf(JsRxdRecord).f6 = function () {
    return this.motorTemp;
  };
  protoOf(JsRxdRecord).g6 = function () {
    return this.controllerTemp;
  };
  protoOf(JsRxdRecord).h6 = function () {
    return this.batteryCurrent;
  };
  protoOf(JsRxdRecord).i6 = function () {
    return this.batteryVoltage;
  };
  protoOf(JsRxdRecord).j6 = function () {
    return this.rpm;
  };
  protoOf(JsRxdRecord).k6 = function () {
    return this.throttlePercent;
  };
  protoOf(JsRxdRecord).l6 = function () {
    return this.batteryTemp;
  };
  protoOf(JsRxdRecord).m6 = function () {
    return this.flagsBitmask;
  };
  protoOf(JsRxdRecord).n6 = function () {
    return this.phaseCurrent;
  };
  protoOf(JsRxdRecord).o6 = function () {
    return this.brakePercent;
  };
  protoOf(JsRxdRecord).p6 = function () {
    return this.speedKph;
  };
  protoOf(JsRxdRecord).q6 = function () {
    return this.phaseCurrentA;
  };
  protoOf(JsRxdRecord).r6 = function () {
    return this.phaseCurrentC;
  };
  protoOf(JsRxdRecord).s6 = function () {
    return this.controllerSoc;
  };
  protoOf(JsRxdRecord).t6 = function () {
    return this.gear;
  };
  protoOf(JsRxdRecord).u6 = function () {
    return this.odometerKm;
  };
  protoOf(JsRxdRecord).v6 = function () {
    return this.lat;
  };
  protoOf(JsRxdRecord).w6 = function () {
    return this.lng;
  };
  protoOf(JsRxdRecord).x6 = function () {
    return this.speed;
  };
  protoOf(JsRxdRecord).y6 = function () {
    return this.altitude;
  };
  protoOf(JsRxdRecord).z6 = function () {
    return this.bearing;
  };
  protoOf(JsRxdRecord).a7 = function () {
    return this.accuracy;
  };
  protoOf(JsRxdRecord).b7 = function () {
    return this.gyroX;
  };
  protoOf(JsRxdRecord).c7 = function () {
    return this.gyroY;
  };
  protoOf(JsRxdRecord).d7 = function () {
    return this.gyroZ;
  };
  protoOf(JsRxdRecord).e7 = function () {
    return this.gyroAccuracy;
  };
  protoOf(JsRxdRecord).f7 = function () {
    return this.gyroType;
  };
  protoOf(JsRxdRecord).g7 = function () {
    return this.gyroOrientation;
  };
  protoOf(JsRxdRecord).h7 = function () {
    return this.eventType;
  };
  protoOf(JsRxdRecord).w4 = function () {
    return this.type;
  };
  protoOf(JsRxdRecord).x4 = function () {
    return this.timeMs;
  };
  protoOf(JsRxdRecord).u5 = function () {
    return this.motorTemp;
  };
  protoOf(JsRxdRecord).v5 = function () {
    return this.controllerTemp;
  };
  protoOf(JsRxdRecord).w5 = function () {
    return this.batteryCurrent;
  };
  protoOf(JsRxdRecord).x5 = function () {
    return this.batteryVoltage;
  };
  protoOf(JsRxdRecord).y5 = function () {
    return this.rpm;
  };
  protoOf(JsRxdRecord).z5 = function () {
    return this.throttlePercent;
  };
  protoOf(JsRxdRecord).a6 = function () {
    return this.batteryTemp;
  };
  protoOf(JsRxdRecord).b6 = function () {
    return this.flagsBitmask;
  };
  protoOf(JsRxdRecord).i7 = function () {
    return this.phaseCurrent;
  };
  protoOf(JsRxdRecord).j7 = function () {
    return this.brakePercent;
  };
  protoOf(JsRxdRecord).k7 = function () {
    return this.speedKph;
  };
  protoOf(JsRxdRecord).l7 = function () {
    return this.phaseCurrentA;
  };
  protoOf(JsRxdRecord).m7 = function () {
    return this.phaseCurrentC;
  };
  protoOf(JsRxdRecord).n7 = function () {
    return this.controllerSoc;
  };
  protoOf(JsRxdRecord).o7 = function () {
    return this.gear;
  };
  protoOf(JsRxdRecord).p7 = function () {
    return this.odometerKm;
  };
  protoOf(JsRxdRecord).q7 = function () {
    return this.lat;
  };
  protoOf(JsRxdRecord).r7 = function () {
    return this.lng;
  };
  protoOf(JsRxdRecord).s7 = function () {
    return this.speed;
  };
  protoOf(JsRxdRecord).t7 = function () {
    return this.altitude;
  };
  protoOf(JsRxdRecord).u7 = function () {
    return this.bearing;
  };
  protoOf(JsRxdRecord).v7 = function () {
    return this.accuracy;
  };
  protoOf(JsRxdRecord).w7 = function () {
    return this.gyroX;
  };
  protoOf(JsRxdRecord).x7 = function () {
    return this.gyroY;
  };
  protoOf(JsRxdRecord).y7 = function () {
    return this.gyroZ;
  };
  protoOf(JsRxdRecord).z7 = function () {
    return this.gyroAccuracy;
  };
  protoOf(JsRxdRecord).a8 = function () {
    return this.gyroType;
  };
  protoOf(JsRxdRecord).b8 = function () {
    return this.gyroOrientation;
  };
  protoOf(JsRxdRecord).c8 = function () {
    return this.eventType;
  };
  protoOf(JsRxdRecord).d8 = function (type, timeMs, motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm, lat, lng, speed, altitude, bearing, accuracy, gyroX, gyroY, gyroZ, gyroAccuracy, gyroType, gyroOrientation, eventType) {
    return new JsRxdRecord(type, timeMs, motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm, lat, lng, speed, altitude, bearing, accuracy, gyroX, gyroY, gyroZ, gyroAccuracy, gyroType, gyroOrientation, eventType);
  };
  protoOf(JsRxdRecord).copy = function (type, timeMs, motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm, lat, lng, speed, altitude, bearing, accuracy, gyroX, gyroY, gyroZ, gyroAccuracy, gyroType, gyroOrientation, eventType, $super) {
    type = type === VOID ? this.type : type;
    timeMs = timeMs === VOID ? this.timeMs : timeMs;
    motorTemp = motorTemp === VOID ? this.motorTemp : motorTemp;
    controllerTemp = controllerTemp === VOID ? this.controllerTemp : controllerTemp;
    batteryCurrent = batteryCurrent === VOID ? this.batteryCurrent : batteryCurrent;
    batteryVoltage = batteryVoltage === VOID ? this.batteryVoltage : batteryVoltage;
    rpm = rpm === VOID ? this.rpm : rpm;
    throttlePercent = throttlePercent === VOID ? this.throttlePercent : throttlePercent;
    batteryTemp = batteryTemp === VOID ? this.batteryTemp : batteryTemp;
    flagsBitmask = flagsBitmask === VOID ? this.flagsBitmask : flagsBitmask;
    phaseCurrent = phaseCurrent === VOID ? this.phaseCurrent : phaseCurrent;
    brakePercent = brakePercent === VOID ? this.brakePercent : brakePercent;
    speedKph = speedKph === VOID ? this.speedKph : speedKph;
    phaseCurrentA = phaseCurrentA === VOID ? this.phaseCurrentA : phaseCurrentA;
    phaseCurrentC = phaseCurrentC === VOID ? this.phaseCurrentC : phaseCurrentC;
    controllerSoc = controllerSoc === VOID ? this.controllerSoc : controllerSoc;
    gear = gear === VOID ? this.gear : gear;
    odometerKm = odometerKm === VOID ? this.odometerKm : odometerKm;
    lat = lat === VOID ? this.lat : lat;
    lng = lng === VOID ? this.lng : lng;
    speed = speed === VOID ? this.speed : speed;
    altitude = altitude === VOID ? this.altitude : altitude;
    bearing = bearing === VOID ? this.bearing : bearing;
    accuracy = accuracy === VOID ? this.accuracy : accuracy;
    gyroX = gyroX === VOID ? this.gyroX : gyroX;
    gyroY = gyroY === VOID ? this.gyroY : gyroY;
    gyroZ = gyroZ === VOID ? this.gyroZ : gyroZ;
    gyroAccuracy = gyroAccuracy === VOID ? this.gyroAccuracy : gyroAccuracy;
    gyroType = gyroType === VOID ? this.gyroType : gyroType;
    gyroOrientation = gyroOrientation === VOID ? this.gyroOrientation : gyroOrientation;
    eventType = eventType === VOID ? this.eventType : eventType;
    return $super === VOID ? this.d8(type, timeMs, motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm, lat, lng, speed, altitude, bearing, accuracy, gyroX, gyroY, gyroZ, gyroAccuracy, gyroType, gyroOrientation, eventType) : $super.d8.call(this, type, timeMs, motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm, lat, lng, speed, altitude, bearing, accuracy, gyroX, gyroY, gyroZ, gyroAccuracy, gyroType, gyroOrientation, eventType);
  };
  protoOf(JsRxdRecord).toString = function () {
    return 'JsRxdRecord(type=' + this.type + ', timeMs=' + this.timeMs + ', motorTemp=' + this.motorTemp + ', controllerTemp=' + this.controllerTemp + ', batteryCurrent=' + this.batteryCurrent + ', batteryVoltage=' + this.batteryVoltage + ', rpm=' + this.rpm + ', throttlePercent=' + this.throttlePercent + ', batteryTemp=' + this.batteryTemp + ', flagsBitmask=' + this.flagsBitmask + ', phaseCurrent=' + this.phaseCurrent + ', brakePercent=' + this.brakePercent + ', speedKph=' + this.speedKph + ', phaseCurrentA=' + this.phaseCurrentA + ', phaseCurrentC=' + this.phaseCurrentC + ', controllerSoc=' + this.controllerSoc + ', gear=' + this.gear + ', odometerKm=' + this.odometerKm + ', lat=' + this.lat + ', lng=' + this.lng + ', speed=' + this.speed + ', altitude=' + this.altitude + ', bearing=' + this.bearing + ', accuracy=' + this.accuracy + ', gyroX=' + this.gyroX + ', gyroY=' + this.gyroY + ', gyroZ=' + this.gyroZ + ', gyroAccuracy=' + this.gyroAccuracy + ', gyroType=' + this.gyroType + ', gyroOrientation=' + this.gyroOrientation + ', eventType=' + this.eventType + ')';
  };
  protoOf(JsRxdRecord).hashCode = function () {
    var result = getStringHashCode(this.type);
    result = imul(result, 31) + getNumberHashCode(this.timeMs) | 0;
    result = imul(result, 31) + (this.motorTemp == null ? 0 : getNumberHashCode(this.motorTemp)) | 0;
    result = imul(result, 31) + (this.controllerTemp == null ? 0 : getNumberHashCode(this.controllerTemp)) | 0;
    result = imul(result, 31) + (this.batteryCurrent == null ? 0 : getNumberHashCode(this.batteryCurrent)) | 0;
    result = imul(result, 31) + (this.batteryVoltage == null ? 0 : getNumberHashCode(this.batteryVoltage)) | 0;
    result = imul(result, 31) + (this.rpm == null ? 0 : this.rpm) | 0;
    result = imul(result, 31) + (this.throttlePercent == null ? 0 : getNumberHashCode(this.throttlePercent)) | 0;
    result = imul(result, 31) + (this.batteryTemp == null ? 0 : getNumberHashCode(this.batteryTemp)) | 0;
    result = imul(result, 31) + (this.flagsBitmask == null ? 0 : getNumberHashCode(this.flagsBitmask)) | 0;
    result = imul(result, 31) + (this.phaseCurrent == null ? 0 : getNumberHashCode(this.phaseCurrent)) | 0;
    result = imul(result, 31) + (this.brakePercent == null ? 0 : getNumberHashCode(this.brakePercent)) | 0;
    result = imul(result, 31) + (this.speedKph == null ? 0 : getNumberHashCode(this.speedKph)) | 0;
    result = imul(result, 31) + (this.phaseCurrentA == null ? 0 : getNumberHashCode(this.phaseCurrentA)) | 0;
    result = imul(result, 31) + (this.phaseCurrentC == null ? 0 : getNumberHashCode(this.phaseCurrentC)) | 0;
    result = imul(result, 31) + (this.controllerSoc == null ? 0 : getNumberHashCode(this.controllerSoc)) | 0;
    result = imul(result, 31) + (this.gear == null ? 0 : this.gear) | 0;
    result = imul(result, 31) + (this.odometerKm == null ? 0 : getNumberHashCode(this.odometerKm)) | 0;
    result = imul(result, 31) + (this.lat == null ? 0 : getNumberHashCode(this.lat)) | 0;
    result = imul(result, 31) + (this.lng == null ? 0 : getNumberHashCode(this.lng)) | 0;
    result = imul(result, 31) + (this.speed == null ? 0 : getNumberHashCode(this.speed)) | 0;
    result = imul(result, 31) + (this.altitude == null ? 0 : getNumberHashCode(this.altitude)) | 0;
    result = imul(result, 31) + (this.bearing == null ? 0 : getNumberHashCode(this.bearing)) | 0;
    result = imul(result, 31) + (this.accuracy == null ? 0 : getNumberHashCode(this.accuracy)) | 0;
    result = imul(result, 31) + (this.gyroX == null ? 0 : getNumberHashCode(this.gyroX)) | 0;
    result = imul(result, 31) + (this.gyroY == null ? 0 : getNumberHashCode(this.gyroY)) | 0;
    result = imul(result, 31) + (this.gyroZ == null ? 0 : getNumberHashCode(this.gyroZ)) | 0;
    result = imul(result, 31) + (this.gyroAccuracy == null ? 0 : this.gyroAccuracy) | 0;
    result = imul(result, 31) + (this.gyroType == null ? 0 : this.gyroType) | 0;
    result = imul(result, 31) + (this.gyroOrientation == null ? 0 : this.gyroOrientation) | 0;
    result = imul(result, 31) + (this.eventType == null ? 0 : this.eventType) | 0;
    return result;
  };
  protoOf(JsRxdRecord).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof JsRxdRecord))
      return false;
    var tmp0_other_with_cast = other instanceof JsRxdRecord ? other : THROW_CCE();
    if (!(this.type === tmp0_other_with_cast.type))
      return false;
    if (!equals(this.timeMs, tmp0_other_with_cast.timeMs))
      return false;
    if (!equals(this.motorTemp, tmp0_other_with_cast.motorTemp))
      return false;
    if (!equals(this.controllerTemp, tmp0_other_with_cast.controllerTemp))
      return false;
    if (!equals(this.batteryCurrent, tmp0_other_with_cast.batteryCurrent))
      return false;
    if (!equals(this.batteryVoltage, tmp0_other_with_cast.batteryVoltage))
      return false;
    if (!(this.rpm == tmp0_other_with_cast.rpm))
      return false;
    if (!equals(this.throttlePercent, tmp0_other_with_cast.throttlePercent))
      return false;
    if (!equals(this.batteryTemp, tmp0_other_with_cast.batteryTemp))
      return false;
    if (!equals(this.flagsBitmask, tmp0_other_with_cast.flagsBitmask))
      return false;
    if (!equals(this.phaseCurrent, tmp0_other_with_cast.phaseCurrent))
      return false;
    if (!equals(this.brakePercent, tmp0_other_with_cast.brakePercent))
      return false;
    if (!equals(this.speedKph, tmp0_other_with_cast.speedKph))
      return false;
    if (!equals(this.phaseCurrentA, tmp0_other_with_cast.phaseCurrentA))
      return false;
    if (!equals(this.phaseCurrentC, tmp0_other_with_cast.phaseCurrentC))
      return false;
    if (!equals(this.controllerSoc, tmp0_other_with_cast.controllerSoc))
      return false;
    if (!(this.gear == tmp0_other_with_cast.gear))
      return false;
    if (!equals(this.odometerKm, tmp0_other_with_cast.odometerKm))
      return false;
    if (!equals(this.lat, tmp0_other_with_cast.lat))
      return false;
    if (!equals(this.lng, tmp0_other_with_cast.lng))
      return false;
    if (!equals(this.speed, tmp0_other_with_cast.speed))
      return false;
    if (!equals(this.altitude, tmp0_other_with_cast.altitude))
      return false;
    if (!equals(this.bearing, tmp0_other_with_cast.bearing))
      return false;
    if (!equals(this.accuracy, tmp0_other_with_cast.accuracy))
      return false;
    if (!equals(this.gyroX, tmp0_other_with_cast.gyroX))
      return false;
    if (!equals(this.gyroY, tmp0_other_with_cast.gyroY))
      return false;
    if (!equals(this.gyroZ, tmp0_other_with_cast.gyroZ))
      return false;
    if (!(this.gyroAccuracy == tmp0_other_with_cast.gyroAccuracy))
      return false;
    if (!(this.gyroType == tmp0_other_with_cast.gyroType))
      return false;
    if (!(this.gyroOrientation == tmp0_other_with_cast.gyroOrientation))
      return false;
    if (!(this.eventType == tmp0_other_with_cast.eventType))
      return false;
    return true;
  };
  function JsRxdFile(header, records) {
    this.header = header;
    this.records = records;
  }
  protoOf(JsRxdFile).e8 = function () {
    return this.header;
  };
  protoOf(JsRxdFile).f8 = function () {
    return this.records;
  };
  protoOf(JsRxdFile).w4 = function () {
    return this.header;
  };
  protoOf(JsRxdFile).x4 = function () {
    return this.records;
  };
  protoOf(JsRxdFile).g8 = function (header, records) {
    return new JsRxdFile(header, records);
  };
  protoOf(JsRxdFile).copy = function (header, records, $super) {
    header = header === VOID ? this.header : header;
    records = records === VOID ? this.records : records;
    return $super === VOID ? this.g8(header, records) : $super.g8.call(this, header, records);
  };
  protoOf(JsRxdFile).toString = function () {
    return 'JsRxdFile(header=' + this.header.toString() + ', records=' + toString(this.records) + ')';
  };
  protoOf(JsRxdFile).hashCode = function () {
    var result = this.header.hashCode();
    result = imul(result, 31) + hashCode(this.records) | 0;
    return result;
  };
  protoOf(JsRxdFile).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof JsRxdFile))
      return false;
    var tmp0_other_with_cast = other instanceof JsRxdFile ? other : THROW_CCE();
    if (!this.header.equals(tmp0_other_with_cast.header))
      return false;
    if (!equals(this.records, tmp0_other_with_cast.records))
      return false;
    return true;
  };
  function RxdJsBridge() {
  }
  protoOf(RxdJsBridge).decode = function (intBytes) {
    var tmp = 0;
    var tmp_0 = intBytes.length;
    var tmp_1 = new Int8Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = toByte(intBytes[tmp_2] & 255);
      tmp = tmp + 1 | 0;
    }
    var bytes = tmp_1;
    var decoded = RxdCodec_instance.h8(bytes);
    var header = decoded.i8_1;
    var tmp_3 = new JsRxdHeader(header.k8_1 & 255, header.l8_1, header.m8_1.j1(), header.n8_1.j1(), header.o8_1.j1(), header.p8_1.j1(), header.q8_1.j1(), header.r8_1, header.s8_1, header.t8_1);
    // Inline function 'kotlin.collections.map' call
    var this_0 = decoded.j8_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.c();
    while (_iterator__ex2g4s.d()) {
      var item = _iterator__ex2g4s.e();
      var tmp_4 = item.v8_1.j1();
      var tmp0_safe_receiver = item.w8_1;
      var tmp_5 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.a9_1;
      var tmp1_safe_receiver = item.w8_1;
      var tmp_6 = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.b9_1;
      var tmp2_safe_receiver = item.w8_1;
      var tmp_7 = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.c9_1;
      var tmp3_safe_receiver = item.w8_1;
      var tmp_8 = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.d9_1;
      var tmp4_safe_receiver = item.w8_1;
      var tmp_9 = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.e9_1;
      var tmp5_safe_receiver = item.w8_1;
      var tmp_10 = tmp5_safe_receiver == null ? null : tmp5_safe_receiver.f9_1;
      var tmp6_safe_receiver = item.w8_1;
      var tmp_11 = tmp6_safe_receiver == null ? null : tmp6_safe_receiver.g9_1;
      var tmp7_safe_receiver = item.w8_1;
      var tmp8_safe_receiver = tmp7_safe_receiver == null ? null : tmp7_safe_receiver.h9_1;
      var tmp_12 = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.j1();
      var tmp9_safe_receiver = item.w8_1;
      var tmp_13 = tmp9_safe_receiver == null ? null : tmp9_safe_receiver.i9_1;
      var tmp10_safe_receiver = item.w8_1;
      var tmp_14 = tmp10_safe_receiver == null ? null : tmp10_safe_receiver.j9_1;
      var tmp11_safe_receiver = item.w8_1;
      var tmp_15 = tmp11_safe_receiver == null ? null : tmp11_safe_receiver.k9_1;
      var tmp12_safe_receiver = item.w8_1;
      var tmp_16 = tmp12_safe_receiver == null ? null : tmp12_safe_receiver.l9_1;
      var tmp13_safe_receiver = item.w8_1;
      var tmp_17 = tmp13_safe_receiver == null ? null : tmp13_safe_receiver.m9_1;
      var tmp14_safe_receiver = item.w8_1;
      var tmp_18 = tmp14_safe_receiver == null ? null : tmp14_safe_receiver.n9_1;
      var tmp15_safe_receiver = item.w8_1;
      var tmp_19 = tmp15_safe_receiver == null ? null : tmp15_safe_receiver.o9_1;
      var tmp16_safe_receiver = item.w8_1;
      var tmp_20 = tmp16_safe_receiver == null ? null : tmp16_safe_receiver.p9_1;
      var tmp17_safe_receiver = item.x8_1;
      var tmp_21 = tmp17_safe_receiver == null ? null : tmp17_safe_receiver.q9_1;
      var tmp18_safe_receiver = item.x8_1;
      var tmp_22 = tmp18_safe_receiver == null ? null : tmp18_safe_receiver.r9_1;
      var tmp19_safe_receiver = item.x8_1;
      var tmp_23 = tmp19_safe_receiver == null ? null : tmp19_safe_receiver.s9_1;
      var tmp20_safe_receiver = item.x8_1;
      var tmp_24 = tmp20_safe_receiver == null ? null : tmp20_safe_receiver.t9_1;
      var tmp21_safe_receiver = item.x8_1;
      var tmp_25 = tmp21_safe_receiver == null ? null : tmp21_safe_receiver.u9_1;
      var tmp22_safe_receiver = item.x8_1;
      var tmp_26 = tmp22_safe_receiver == null ? null : tmp22_safe_receiver.v9_1;
      var tmp23_safe_receiver = item.y8_1;
      var tmp_27 = tmp23_safe_receiver == null ? null : tmp23_safe_receiver.w9_1;
      var tmp24_safe_receiver = item.y8_1;
      var tmp_28 = tmp24_safe_receiver == null ? null : tmp24_safe_receiver.x9_1;
      var tmp25_safe_receiver = item.y8_1;
      var tmp_29 = tmp25_safe_receiver == null ? null : tmp25_safe_receiver.y9_1;
      var tmp26_safe_receiver = item.y8_1;
      var tmp_30 = tmp26_safe_receiver == null ? null : tmp26_safe_receiver.z9_1;
      var tmp27_safe_receiver = item.y8_1;
      var tmp_31 = tmp27_safe_receiver == null ? null : tmp27_safe_receiver.aa_1;
      var tmp28_safe_receiver = item.y8_1;
      var tmp_32 = tmp28_safe_receiver == null ? null : tmp28_safe_receiver.ba_1;
      var tmp29_safe_receiver = item.z8_1;
      var tmp$ret$1 = new JsRxdRecord(item.u8_1.q_1, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp29_safe_receiver == null ? null : tmp29_safe_receiver.ca_1);
      destination.h(tmp$ret$1);
    }
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$4 = copyToArray(destination);
    return new JsRxdFile(tmp_3, tmp$ret$4);
  };
  var RxdJsBridge_instance;
  function RxdJsBridge_getInstance() {
    return RxdJsBridge_instance;
  }
  function RxdSharedFormat() {
    RxdSharedFormat_instance = this;
    var tmp = this;
    // Inline function 'kotlin.byteArrayOf' call
    tmp.da_1 = new Int8Array([79, 78, 89, 88]);
    this.ea_1 = 2;
    this.fa_1 = 3;
    this.ga_1 = 4;
    this.ha_1 = 5;
    this.ia_1 = 48;
    this.ja_1 = 1;
    this.ka_1 = 2;
    this.la_1 = 3;
    this.ma_1 = 4;
    this.na_1 = 255;
    this.oa_1 = 1;
    this.pa_1 = 2;
    this.qa_1 = 4;
    this.ra_1 = 1;
    this.sa_1 = 2;
    this.ta_1 = 4;
    this.ua_1 = 8;
    this.va_1 = 16;
    this.wa_1 = 32;
    this.xa_1 = 64;
    this.ya_1 = 128;
    this.za_1 = 1;
    this.ab_1 = 2;
    this.bb_1 = 4;
    this.cb_1 = 8;
    this.db_1 = 16;
    this.eb_1 = 32;
    this.fb_1 = 1;
    this.gb_1 = 2;
    this.hb_1 = 4;
    this.ib_1 = 8;
    this.jb_1 = 16;
    this.kb_1 = 32;
    this.lb_1 = 1;
    this.mb_1 = 2;
    this.nb_1 = 4;
    this.ob_1 = 8;
    this.pb_1 = 16;
    this.qb_1 = 1;
    this.rb_1 = 2;
    this.sb_1 = 4;
    this.tb_1 = 8;
    this.ub_1 = 1;
    this.vb_1 = 2;
    this.wb_1 = 3;
  }
  var RxdSharedFormat_instance;
  function RxdSharedFormat_getInstance() {
    if (RxdSharedFormat_instance == null)
      new RxdSharedFormat();
    return RxdSharedFormat_instance;
  }
  var RxdRecordType_TELEMETRY_instance;
  var RxdRecordType_GPS_instance;
  var RxdRecordType_GYRO_instance;
  var RxdRecordType_EVENT_instance;
  var RxdRecordType_entriesInitialized;
  function RxdRecordType_initEntries() {
    if (RxdRecordType_entriesInitialized)
      return Unit_instance;
    RxdRecordType_entriesInitialized = true;
    RxdRecordType_TELEMETRY_instance = new RxdRecordType('TELEMETRY', 0);
    RxdRecordType_GPS_instance = new RxdRecordType('GPS', 1);
    RxdRecordType_GYRO_instance = new RxdRecordType('GYRO', 2);
    RxdRecordType_EVENT_instance = new RxdRecordType('EVENT', 3);
  }
  function RxdRecordType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function RxdHeader(version, contentFlags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion) {
    version = version === VOID ? 3 : version;
    device = device === VOID ? null : device;
    modelName = modelName === VOID ? null : modelName;
    firmwareVersion = firmwareVersion === VOID ? null : firmwareVersion;
    this.k8_1 = version;
    this.l8_1 = contentFlags;
    this.m8_1 = recordingId;
    this.n8_1 = startTimeMs;
    this.o8_1 = endTimeMs;
    this.p8_1 = controllerId;
    this.q8_1 = bmsId;
    this.r8_1 = device;
    this.s8_1 = modelName;
    this.t8_1 = firmwareVersion;
  }
  protoOf(RxdHeader).toString = function () {
    return 'RxdHeader(version=' + this.k8_1 + ', contentFlags=' + this.l8_1 + ', recordingId=' + this.m8_1.toString() + ', startTimeMs=' + this.n8_1.toString() + ', endTimeMs=' + this.o8_1.toString() + ', controllerId=' + this.p8_1.toString() + ', bmsId=' + this.q8_1.toString() + ', device=' + this.r8_1 + ', modelName=' + this.s8_1 + ', firmwareVersion=' + this.t8_1 + ')';
  };
  protoOf(RxdHeader).hashCode = function () {
    var result = this.k8_1;
    result = imul(result, 31) + this.l8_1 | 0;
    result = imul(result, 31) + this.m8_1.hashCode() | 0;
    result = imul(result, 31) + this.n8_1.hashCode() | 0;
    result = imul(result, 31) + this.o8_1.hashCode() | 0;
    result = imul(result, 31) + this.p8_1.hashCode() | 0;
    result = imul(result, 31) + this.q8_1.hashCode() | 0;
    result = imul(result, 31) + (this.r8_1 == null ? 0 : getStringHashCode(this.r8_1)) | 0;
    result = imul(result, 31) + (this.s8_1 == null ? 0 : getStringHashCode(this.s8_1)) | 0;
    result = imul(result, 31) + (this.t8_1 == null ? 0 : getStringHashCode(this.t8_1)) | 0;
    return result;
  };
  protoOf(RxdHeader).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdHeader))
      return false;
    var tmp0_other_with_cast = other instanceof RxdHeader ? other : THROW_CCE();
    if (!(this.k8_1 === tmp0_other_with_cast.k8_1))
      return false;
    if (!(this.l8_1 === tmp0_other_with_cast.l8_1))
      return false;
    if (!this.m8_1.equals(tmp0_other_with_cast.m8_1))
      return false;
    if (!this.n8_1.equals(tmp0_other_with_cast.n8_1))
      return false;
    if (!this.o8_1.equals(tmp0_other_with_cast.o8_1))
      return false;
    if (!this.p8_1.equals(tmp0_other_with_cast.p8_1))
      return false;
    if (!this.q8_1.equals(tmp0_other_with_cast.q8_1))
      return false;
    if (!(this.r8_1 == tmp0_other_with_cast.r8_1))
      return false;
    if (!(this.s8_1 == tmp0_other_with_cast.s8_1))
      return false;
    if (!(this.t8_1 == tmp0_other_with_cast.t8_1))
      return false;
    return true;
  };
  function RxdTelemetry(motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm) {
    motorTemp = motorTemp === VOID ? null : motorTemp;
    controllerTemp = controllerTemp === VOID ? null : controllerTemp;
    batteryCurrent = batteryCurrent === VOID ? null : batteryCurrent;
    batteryVoltage = batteryVoltage === VOID ? null : batteryVoltage;
    rpm = rpm === VOID ? null : rpm;
    throttlePercent = throttlePercent === VOID ? null : throttlePercent;
    batteryTemp = batteryTemp === VOID ? null : batteryTemp;
    flagsBitmask = flagsBitmask === VOID ? null : flagsBitmask;
    phaseCurrent = phaseCurrent === VOID ? null : phaseCurrent;
    brakePercent = brakePercent === VOID ? null : brakePercent;
    speedKph = speedKph === VOID ? null : speedKph;
    phaseCurrentA = phaseCurrentA === VOID ? null : phaseCurrentA;
    phaseCurrentC = phaseCurrentC === VOID ? null : phaseCurrentC;
    controllerSoc = controllerSoc === VOID ? null : controllerSoc;
    gear = gear === VOID ? null : gear;
    odometerKm = odometerKm === VOID ? null : odometerKm;
    this.a9_1 = motorTemp;
    this.b9_1 = controllerTemp;
    this.c9_1 = batteryCurrent;
    this.d9_1 = batteryVoltage;
    this.e9_1 = rpm;
    this.f9_1 = throttlePercent;
    this.g9_1 = batteryTemp;
    this.h9_1 = flagsBitmask;
    this.i9_1 = phaseCurrent;
    this.j9_1 = brakePercent;
    this.k9_1 = speedKph;
    this.l9_1 = phaseCurrentA;
    this.m9_1 = phaseCurrentC;
    this.n9_1 = controllerSoc;
    this.o9_1 = gear;
    this.p9_1 = odometerKm;
  }
  protoOf(RxdTelemetry).toString = function () {
    return 'RxdTelemetry(motorTemp=' + this.a9_1 + ', controllerTemp=' + this.b9_1 + ', batteryCurrent=' + this.c9_1 + ', batteryVoltage=' + this.d9_1 + ', rpm=' + this.e9_1 + ', throttlePercent=' + this.f9_1 + ', batteryTemp=' + this.g9_1 + ', flagsBitmask=' + toString_0(this.h9_1) + ', phaseCurrent=' + this.i9_1 + ', brakePercent=' + this.j9_1 + ', speedKph=' + this.k9_1 + ', phaseCurrentA=' + this.l9_1 + ', phaseCurrentC=' + this.m9_1 + ', controllerSoc=' + this.n9_1 + ', gear=' + this.o9_1 + ', odometerKm=' + this.p9_1 + ')';
  };
  protoOf(RxdTelemetry).hashCode = function () {
    var result = this.a9_1 == null ? 0 : getNumberHashCode(this.a9_1);
    result = imul(result, 31) + (this.b9_1 == null ? 0 : getNumberHashCode(this.b9_1)) | 0;
    result = imul(result, 31) + (this.c9_1 == null ? 0 : getNumberHashCode(this.c9_1)) | 0;
    result = imul(result, 31) + (this.d9_1 == null ? 0 : getNumberHashCode(this.d9_1)) | 0;
    result = imul(result, 31) + (this.e9_1 == null ? 0 : this.e9_1) | 0;
    result = imul(result, 31) + (this.f9_1 == null ? 0 : getNumberHashCode(this.f9_1)) | 0;
    result = imul(result, 31) + (this.g9_1 == null ? 0 : getNumberHashCode(this.g9_1)) | 0;
    result = imul(result, 31) + (this.h9_1 == null ? 0 : this.h9_1.hashCode()) | 0;
    result = imul(result, 31) + (this.i9_1 == null ? 0 : getNumberHashCode(this.i9_1)) | 0;
    result = imul(result, 31) + (this.j9_1 == null ? 0 : getNumberHashCode(this.j9_1)) | 0;
    result = imul(result, 31) + (this.k9_1 == null ? 0 : getNumberHashCode(this.k9_1)) | 0;
    result = imul(result, 31) + (this.l9_1 == null ? 0 : getNumberHashCode(this.l9_1)) | 0;
    result = imul(result, 31) + (this.m9_1 == null ? 0 : getNumberHashCode(this.m9_1)) | 0;
    result = imul(result, 31) + (this.n9_1 == null ? 0 : getNumberHashCode(this.n9_1)) | 0;
    result = imul(result, 31) + (this.o9_1 == null ? 0 : this.o9_1) | 0;
    result = imul(result, 31) + (this.p9_1 == null ? 0 : getNumberHashCode(this.p9_1)) | 0;
    return result;
  };
  protoOf(RxdTelemetry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdTelemetry))
      return false;
    var tmp0_other_with_cast = other instanceof RxdTelemetry ? other : THROW_CCE();
    if (!equals(this.a9_1, tmp0_other_with_cast.a9_1))
      return false;
    if (!equals(this.b9_1, tmp0_other_with_cast.b9_1))
      return false;
    if (!equals(this.c9_1, tmp0_other_with_cast.c9_1))
      return false;
    if (!equals(this.d9_1, tmp0_other_with_cast.d9_1))
      return false;
    if (!(this.e9_1 == tmp0_other_with_cast.e9_1))
      return false;
    if (!equals(this.f9_1, tmp0_other_with_cast.f9_1))
      return false;
    if (!equals(this.g9_1, tmp0_other_with_cast.g9_1))
      return false;
    if (!equals(this.h9_1, tmp0_other_with_cast.h9_1))
      return false;
    if (!equals(this.i9_1, tmp0_other_with_cast.i9_1))
      return false;
    if (!equals(this.j9_1, tmp0_other_with_cast.j9_1))
      return false;
    if (!equals(this.k9_1, tmp0_other_with_cast.k9_1))
      return false;
    if (!equals(this.l9_1, tmp0_other_with_cast.l9_1))
      return false;
    if (!equals(this.m9_1, tmp0_other_with_cast.m9_1))
      return false;
    if (!equals(this.n9_1, tmp0_other_with_cast.n9_1))
      return false;
    if (!(this.o9_1 == tmp0_other_with_cast.o9_1))
      return false;
    if (!equals(this.p9_1, tmp0_other_with_cast.p9_1))
      return false;
    return true;
  };
  function RxdGps(lat, lng, speed, altitude, bearing, accuracy) {
    lat = lat === VOID ? null : lat;
    lng = lng === VOID ? null : lng;
    speed = speed === VOID ? null : speed;
    altitude = altitude === VOID ? null : altitude;
    bearing = bearing === VOID ? null : bearing;
    accuracy = accuracy === VOID ? null : accuracy;
    this.q9_1 = lat;
    this.r9_1 = lng;
    this.s9_1 = speed;
    this.t9_1 = altitude;
    this.u9_1 = bearing;
    this.v9_1 = accuracy;
  }
  protoOf(RxdGps).toString = function () {
    return 'RxdGps(lat=' + this.q9_1 + ', lng=' + this.r9_1 + ', speed=' + this.s9_1 + ', altitude=' + this.t9_1 + ', bearing=' + this.u9_1 + ', accuracy=' + this.v9_1 + ')';
  };
  protoOf(RxdGps).hashCode = function () {
    var result = this.q9_1 == null ? 0 : getNumberHashCode(this.q9_1);
    result = imul(result, 31) + (this.r9_1 == null ? 0 : getNumberHashCode(this.r9_1)) | 0;
    result = imul(result, 31) + (this.s9_1 == null ? 0 : getNumberHashCode(this.s9_1)) | 0;
    result = imul(result, 31) + (this.t9_1 == null ? 0 : getNumberHashCode(this.t9_1)) | 0;
    result = imul(result, 31) + (this.u9_1 == null ? 0 : getNumberHashCode(this.u9_1)) | 0;
    result = imul(result, 31) + (this.v9_1 == null ? 0 : getNumberHashCode(this.v9_1)) | 0;
    return result;
  };
  protoOf(RxdGps).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdGps))
      return false;
    var tmp0_other_with_cast = other instanceof RxdGps ? other : THROW_CCE();
    if (!equals(this.q9_1, tmp0_other_with_cast.q9_1))
      return false;
    if (!equals(this.r9_1, tmp0_other_with_cast.r9_1))
      return false;
    if (!equals(this.s9_1, tmp0_other_with_cast.s9_1))
      return false;
    if (!equals(this.t9_1, tmp0_other_with_cast.t9_1))
      return false;
    if (!equals(this.u9_1, tmp0_other_with_cast.u9_1))
      return false;
    if (!equals(this.v9_1, tmp0_other_with_cast.v9_1))
      return false;
    return true;
  };
  function RxdGyro(x, y, z, accuracy, type, orientation) {
    x = x === VOID ? null : x;
    y = y === VOID ? null : y;
    z = z === VOID ? null : z;
    accuracy = accuracy === VOID ? null : accuracy;
    type = type === VOID ? null : type;
    orientation = orientation === VOID ? null : orientation;
    this.w9_1 = x;
    this.x9_1 = y;
    this.y9_1 = z;
    this.z9_1 = accuracy;
    this.aa_1 = type;
    this.ba_1 = orientation;
  }
  protoOf(RxdGyro).toString = function () {
    return 'RxdGyro(x=' + this.w9_1 + ', y=' + this.x9_1 + ', z=' + this.y9_1 + ', accuracy=' + this.z9_1 + ', type=' + this.aa_1 + ', orientation=' + this.ba_1 + ')';
  };
  protoOf(RxdGyro).hashCode = function () {
    var result = this.w9_1 == null ? 0 : getNumberHashCode(this.w9_1);
    result = imul(result, 31) + (this.x9_1 == null ? 0 : getNumberHashCode(this.x9_1)) | 0;
    result = imul(result, 31) + (this.y9_1 == null ? 0 : getNumberHashCode(this.y9_1)) | 0;
    result = imul(result, 31) + (this.z9_1 == null ? 0 : this.z9_1) | 0;
    result = imul(result, 31) + (this.aa_1 == null ? 0 : this.aa_1) | 0;
    result = imul(result, 31) + (this.ba_1 == null ? 0 : this.ba_1) | 0;
    return result;
  };
  protoOf(RxdGyro).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdGyro))
      return false;
    var tmp0_other_with_cast = other instanceof RxdGyro ? other : THROW_CCE();
    if (!equals(this.w9_1, tmp0_other_with_cast.w9_1))
      return false;
    if (!equals(this.x9_1, tmp0_other_with_cast.x9_1))
      return false;
    if (!equals(this.y9_1, tmp0_other_with_cast.y9_1))
      return false;
    if (!(this.z9_1 == tmp0_other_with_cast.z9_1))
      return false;
    if (!(this.aa_1 == tmp0_other_with_cast.aa_1))
      return false;
    if (!(this.ba_1 == tmp0_other_with_cast.ba_1))
      return false;
    return true;
  };
  function RxdEvent(eventType) {
    this.ca_1 = eventType;
  }
  protoOf(RxdEvent).toString = function () {
    return 'RxdEvent(eventType=' + this.ca_1 + ')';
  };
  protoOf(RxdEvent).hashCode = function () {
    return this.ca_1;
  };
  protoOf(RxdEvent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdEvent))
      return false;
    var tmp0_other_with_cast = other instanceof RxdEvent ? other : THROW_CCE();
    if (!(this.ca_1 === tmp0_other_with_cast.ca_1))
      return false;
    return true;
  };
  function RxdRecord(type, timeMs, telemetry, gps, gyro, event) {
    telemetry = telemetry === VOID ? null : telemetry;
    gps = gps === VOID ? null : gps;
    gyro = gyro === VOID ? null : gyro;
    event = event === VOID ? null : event;
    this.u8_1 = type;
    this.v8_1 = timeMs;
    this.w8_1 = telemetry;
    this.x8_1 = gps;
    this.y8_1 = gyro;
    this.z8_1 = event;
  }
  protoOf(RxdRecord).toString = function () {
    return 'RxdRecord(type=' + this.u8_1.toString() + ', timeMs=' + this.v8_1.toString() + ', telemetry=' + toString_0(this.w8_1) + ', gps=' + toString_0(this.x8_1) + ', gyro=' + toString_0(this.y8_1) + ', event=' + toString_0(this.z8_1) + ')';
  };
  protoOf(RxdRecord).hashCode = function () {
    var result = this.u8_1.hashCode();
    result = imul(result, 31) + this.v8_1.hashCode() | 0;
    result = imul(result, 31) + (this.w8_1 == null ? 0 : this.w8_1.hashCode()) | 0;
    result = imul(result, 31) + (this.x8_1 == null ? 0 : this.x8_1.hashCode()) | 0;
    result = imul(result, 31) + (this.y8_1 == null ? 0 : this.y8_1.hashCode()) | 0;
    result = imul(result, 31) + (this.z8_1 == null ? 0 : this.z8_1.hashCode()) | 0;
    return result;
  };
  protoOf(RxdRecord).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdRecord))
      return false;
    var tmp0_other_with_cast = other instanceof RxdRecord ? other : THROW_CCE();
    if (!this.u8_1.equals(tmp0_other_with_cast.u8_1))
      return false;
    if (!this.v8_1.equals(tmp0_other_with_cast.v8_1))
      return false;
    if (!equals(this.w8_1, tmp0_other_with_cast.w8_1))
      return false;
    if (!equals(this.x8_1, tmp0_other_with_cast.x8_1))
      return false;
    if (!equals(this.y8_1, tmp0_other_with_cast.y8_1))
      return false;
    if (!equals(this.z8_1, tmp0_other_with_cast.z8_1))
      return false;
    return true;
  };
  function RxdFile(header, records) {
    this.i8_1 = header;
    this.j8_1 = records;
  }
  protoOf(RxdFile).toString = function () {
    return 'RxdFile(header=' + this.i8_1.toString() + ', records=' + toString(this.j8_1) + ')';
  };
  protoOf(RxdFile).hashCode = function () {
    var result = this.i8_1.hashCode();
    result = imul(result, 31) + hashCode(this.j8_1) | 0;
    return result;
  };
  protoOf(RxdFile).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RxdFile))
      return false;
    var tmp0_other_with_cast = other instanceof RxdFile ? other : THROW_CCE();
    if (!this.i8_1.equals(tmp0_other_with_cast.i8_1))
      return false;
    if (!equals(this.j8_1, tmp0_other_with_cast.j8_1))
      return false;
    return true;
  };
  function readHeader($this, inp) {
    var magic = inp.zb(4);
    // Inline function 'kotlin.require' call
    if (!contentEquals(magic, RxdSharedFormat_getInstance().da_1)) {
      var message = 'Not an RXD file (bad magic)';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var version = toByte(inp.ac());
    var flags = inp.ac();
    inp.bc();
    var recordingId = inp.cc();
    var startTimeMs = inp.cc();
    var endTimeMs = inp.cc();
    var controllerId = inp.cc();
    var bmsId = inp.cc();
    var device;
    var modelName;
    var firmwareVersion;
    if (version >= 4) {
      device = inp.dc();
      modelName = inp.dc();
      firmwareVersion = inp.dc();
    } else {
      device = null;
      modelName = null;
      firmwareVersion = null;
    }
    return new RxdHeader(version, flags, recordingId, startTimeMs, endTimeMs, controllerId, bmsId, device, modelName, firmwareVersion);
  }
  function has($this, _this__u8e3s4, bit) {
    return !((_this__u8e3s4 & bit) === 0);
  }
  function RxdCodec() {
  }
  protoOf(RxdCodec).h8 = function (bytes) {
    var inp = new ByteReader(bytes);
    var header = readHeader(this, inp);
    // Inline function 'kotlin.collections.mutableListOf' call
    var records = ArrayList_init_$Create$_0();
    $l$loop: while (inp.ec() > 0) {
      var type = inp.ac();
      if (type === 255)
        break $l$loop;
      var delta = inp.fc();
      var timeMs = header.n8_1.a1(delta);
      switch (type) {
        case 1:
          var mask1 = inp.ac();
          var mask2 = inp.ac();
          var mask3 = header.k8_1 >= 5 ? inp.ac() : 0;
          var isV3 = header.k8_1 >= 3;
          var motorTemp = has(this, mask1, 1) ? inp.gc() / 10.0 : null;
          var controllerTemp = has(this, mask1, 2) ? inp.gc() / 10.0 : null;
          var batteryCurrent = has(this, mask1, 4) ? inp.gc() / 10.0 : null;
          var batteryVoltage = has(this, mask1, 8) ? inp.bc() / 100.0 : null;
          var rpm = has(this, mask1, 16) ? inp.bc() : null;
          var throttlePercent = has(this, mask1, 32) ? inp.ac() : null;
          var batteryTemp = has(this, mask1, 64) ? inp.gc() / 10.0 : null;
          var tmp;
          if (has(this, mask1, 128)) {
            tmp = isV3 ? inp.cc() : toLong(inp.hc()).f1(new Long(-1, 0));
          } else {
            tmp = null;
          }

          var legacyFlags = tmp;
          if (has(this, mask2, 1)) {
            inp.bc();
          }

          if (has(this, mask2, 2)) {
            inp.bc();
          }

          var phaseCurrent = has(this, mask2, 4) ? inp.gc() / 10.0 : null;
          var brakePercent = has(this, mask2, 8) ? inp.bc() / 10.0 : null;
          var errBits = has(this, mask2, 16) ? toLong(inp.hc()).f1(new Long(-1, 0)) : null;
          var stsBits = has(this, mask2, 32) ? toLong(inp.hc()) : null;
          var tmp_0;
          if (legacyFlags == null) {
            var tmp_1;
            if (!(errBits == null) || !(stsBits == null)) {
              var tmp_2 = errBits == null ? new Long(0, 0) : errBits;
              tmp_1 = tmp_2.g1((stsBits == null ? new Long(0, 0) : stsBits).e1(32));
            } else {
              tmp_1 = null;
            }
            tmp_0 = tmp_1;
          } else {
            tmp_0 = legacyFlags;
          }

          var flagsBitmask = tmp_0;
          var speedKph = has(this, mask3, 1) ? inp.bc() / 100.0 : null;
          var phaseCurrentA = has(this, mask3, 2) ? inp.gc() / 10.0 : null;
          var phaseCurrentC = has(this, mask3, 4) ? inp.gc() / 10.0 : null;
          var controllerSoc = has(this, mask3, 8) ? inp.bc() / 10.0 : null;
          var gear = has(this, mask3, 16) ? inp.ac() : null;
          var odometerKm = has(this, mask3, 32) ? inp.fc().i1() / 10.0 : null;
          // Inline function 'kotlin.collections.plusAssign' call

          var element = new RxdRecord(RxdRecordType_TELEMETRY_getInstance(), timeMs, new RxdTelemetry(motorTemp, controllerTemp, batteryCurrent, batteryVoltage, rpm, throttlePercent, batteryTemp, flagsBitmask, phaseCurrent, brakePercent, speedKph, phaseCurrentA, phaseCurrentC, controllerSoc, gear, odometerKm));
          records.h(element);
          break;
        case 2:
          var mask = inp.ac();
          var lat = has(this, mask, 1) ? inp.hc() / 1.0E7 : null;
          var lng = has(this, mask, 1) ? inp.hc() / 1.0E7 : null;
          // Inline function 'kotlin.collections.plusAssign' call

          var element_0 = new RxdRecord(RxdRecordType_GPS_getInstance(), timeMs, VOID, new RxdGps(lat, lng, has(this, mask, 2) ? inp.bc() / 100.0 : null, has(this, mask, 4) ? inp.gc() / 10.0 : null, has(this, mask, 8) ? inp.bc() / 100.0 : null, has(this, mask, 16) ? inp.ac() : null));
          records.h(element_0);
          break;
        case 3:
          var mask_0 = inp.ac();
          // Inline function 'kotlin.collections.plusAssign' call

          var element_1 = new RxdRecord(RxdRecordType_GYRO_getInstance(), timeMs, VOID, VOID, new RxdGyro(has(this, mask_0, 1) ? inp.gc() / 1000.0 : null, has(this, mask_0, 1) ? inp.gc() / 1000.0 : null, has(this, mask_0, 1) ? inp.gc() / 1000.0 : null, has(this, mask_0, 2) ? inp.ac() : null, has(this, mask_0, 4) ? inp.ac() : null, has(this, mask_0, 8) ? inp.ac() : null));
          records.h(element_1);
          break;
        case 4:
          // Inline function 'kotlin.collections.plusAssign' call

          var element_2 = new RxdRecord(RxdRecordType_EVENT_getInstance(), timeMs, VOID, VOID, VOID, new RxdEvent(inp.ac()));
          records.h(element_2);
          break;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Unknown RXD record type 0x' + toString_1(type, 16);
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    return new RxdFile(header, records);
  };
  var RxdCodec_instance;
  function RxdCodec_getInstance() {
    return RxdCodec_instance;
  }
  function ByteReader(data) {
    this.xb_1 = data;
    this.yb_1 = 0;
  }
  protoOf(ByteReader).ec = function () {
    return this.xb_1.length - this.yb_1 | 0;
  };
  protoOf(ByteReader).zb = function (count) {
    // Inline function 'kotlin.check' call
    if (!((this.yb_1 + count | 0) <= this.xb_1.length)) {
      var message = 'Unexpected end of RXD stream';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var out = copyOfRange(this.xb_1, this.yb_1, this.yb_1 + count | 0);
    this.yb_1 = this.yb_1 + count | 0;
    return out;
  };
  protoOf(ByteReader).ac = function () {
    // Inline function 'kotlin.check' call
    if (!(this.yb_1 < this.xb_1.length)) {
      var message = 'Unexpected end of RXD stream';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var _unary__edvuaz = this.yb_1;
    this.yb_1 = _unary__edvuaz + 1 | 0;
    return this.xb_1[_unary__edvuaz] & 255;
  };
  protoOf(ByteReader).bc = function () {
    var hi = this.ac();
    var lo = this.ac();
    return hi << 8 | lo;
  };
  protoOf(ByteReader).gc = function () {
    return toShort(this.bc());
  };
  protoOf(ByteReader).hc = function () {
    var b0 = this.ac();
    var b1 = this.ac();
    var b2 = this.ac();
    var b3 = this.ac();
    return b0 << 24 | b1 << 16 | b2 << 8 | b3;
  };
  protoOf(ByteReader).fc = function () {
    return toLong(this.hc()).f1(new Long(-1, 0));
  };
  protoOf(ByteReader).cc = function () {
    var v = new Long(0, 0);
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < 8)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        v = v.e1(8).g1(toLong(this.ac()));
      }
       while (inductionVariable < 8);
    return v;
  };
  protoOf(ByteReader).dc = function () {
    var len = this.ac();
    if (len === 0)
      return null;
    return decodeToString(this.zb(len));
  };
  function RxdRecordType_TELEMETRY_getInstance() {
    RxdRecordType_initEntries();
    return RxdRecordType_TELEMETRY_instance;
  }
  function RxdRecordType_GPS_getInstance() {
    RxdRecordType_initEntries();
    return RxdRecordType_GPS_instance;
  }
  function RxdRecordType_GYRO_getInstance() {
    RxdRecordType_initEntries();
    return RxdRecordType_GYRO_instance;
  }
  function RxdRecordType_EVENT_getInstance() {
    RxdRecordType_initEntries();
    return RxdRecordType_EVENT_instance;
  }
  //region block: init
  RxdControllerFlagsBridge_instance = new RxdControllerFlagsBridge();
  RxdFlagsBitmask_instance = new RxdFlagsBitmask();
  RxdJsBridge_instance = new RxdJsBridge();
  RxdCodec_instance = new RxdCodec();
  //endregion
  //region block: exports
  function $jsExportAll$(_) {
    var $us = _.us || (_.us = {});
    var $us$wmwm = $us.wmwm || ($us.wmwm = {});
    var $us$wmwm$onyx = $us$wmwm.onyx || ($us$wmwm.onyx = {});
    var $us$wmwm$onyx$rxd = $us$wmwm$onyx.rxd || ($us$wmwm$onyx.rxd = {});
    defineProp($us$wmwm$onyx$rxd, 'RxdControllerFlagsBridge', RxdControllerFlagsBridge_getInstance);
    var $us = _.us || (_.us = {});
    var $us$wmwm = $us.wmwm || ($us.wmwm = {});
    var $us$wmwm$onyx = $us$wmwm.onyx || ($us$wmwm.onyx = {});
    var $us$wmwm$onyx$rxd = $us$wmwm$onyx.rxd || ($us$wmwm$onyx.rxd = {});
    $us$wmwm$onyx$rxd.JsRxdHeader = JsRxdHeader;
    $us$wmwm$onyx$rxd.JsRxdRecord = JsRxdRecord;
    $us$wmwm$onyx$rxd.JsRxdFile = JsRxdFile;
    defineProp($us$wmwm$onyx$rxd, 'RxdJsBridge', RxdJsBridge_getInstance);
  }
  $jsExportAll$(_);
  //endregion
  return _;
}));

//# sourceMappingURL=Onyx-rxd-kmp.js.map
