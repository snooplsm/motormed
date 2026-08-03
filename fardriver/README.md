# FarDriver Schema Notes

These files are a first-pass FarDriver schema scaffold.

They are not yet byte-accurate like the Kelly JSON files.

What is confirmed:
- BLE service/characteristic
- old vs new protocol framing
- primary config blob length: 384 bytes
- secondary config blob length: 312 bytes
- new-protocol config register range: 0x38..0x57
- many parameter names and groups from the public manual

What still needs validation:
- exact byte offsets
- exact byte lengths
- integer scaling
- enum value maps
- model/firmware-specific differences

These schemas are intended to give us a structured place to accumulate confirmed FarDriver settings as we capture real config dumps.
