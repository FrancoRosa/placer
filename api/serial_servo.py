from time import sleep
import serial

while True:
    try:
        servoSerial = serial.Serial('/dev/ttyUSB0')
        print('.. servos connected')
        break
    except:
        print('.. servos not found')
        sleep(5)
