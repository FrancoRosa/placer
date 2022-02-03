
ser = serial.Serial(port='/dev/ttyUSB0', baudrate=115200, timeout=1)
print("connected to: " + ser.portstr)


def get_degrees(arr):
    return((arr[1] << 8) | arr[0])/32768*180


buffer = b'\x00'*22
while True:
    x = ser.readline(1)
    buffer = buffer[1:] + x
    if buffer[-2:] == buffer[:2] == b'\x55\x61':
        for i in buffer:
            print("%X" % i, end=" ")
        roll = [buffer[14], buffer[15]]
        pitch = [buffer[16], buffer[17]]
        yaw = [buffer[18], buffer[19]]
        print("\nroll: %.2f, pitch: %.2f, yaw: %.2f\n"
              % (get_degrees(roll), get_degrees(pitch), get_degrees(yaw))
              )

ser.close()
