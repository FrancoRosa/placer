import serial
import re

ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)
print("connected to: " + ser.portstr)

relative = b'\xb5\x62\x01\x3c\x40\x00'
position = b'\xb5\x62\x01\x07\x5c\x00'


def get_frame(data, preamble):
    if preamble in data:
        index = data.index(preamble)
        frame_len = preamble[4]
        preamble_len = len(preamble)
        portion = data[index+preamble_len:index+preamble_len+frame_len]
        return portion
    return None


while True:
    x = ser.readline()
    position_frame = get_frame(x, position)
    if position_frame:
        accuracy = int.from_bytes(
            position_frame[40:44], "little", signed=False)

    relative_frame = get_frame(x, relative)
    if relative_frame:
        time = int.from_bytes(relative_frame[4:8], "little", signed=False)
        distance = int.from_bytes(relative_frame[20:24], "little", signed=True)
        heading = int.from_bytes(relative_frame[24:28], "little", signed=True)

        print("acc: %.2f, time: %d, head: %.2fº, dist: %dcm" %
              (accuracy*1e-3, time*1e-3, heading*1e-5, distance))


ser.close()
