import serial


def numberToBase(n, b):
    if n == 0:
        return [0]
    digits = []
    while n:
        digits.append(int(n % b))
        n //= b
    return digits[::-1]


def get_degrees(arr):
    return((arr[1] << 8) | arr[0])/32768*180


ser = serial.Serial(port='/dev/ttyUSB0', baudrate=115200, timeout=1)

print("connected to: " + ser.portstr)

while True:
    x = ser.readline(20)
    r = []
    if len(x) == 20:
        for a in x:
            num = int(a)
            r.append(num)
            print("%X" % num, sep=" ", end=" ")
        roll = r[14:16]
        pitch = r[16:18]
        yaw = r[18:20]
        print("\nroll: %.2f, pitch: %.2f, yaw: %.2f\n" %
              (get_degrees(roll), get_degrees(pitch), get_degrees(yaw)))

ser.close()
