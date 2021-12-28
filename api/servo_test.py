"""
Servo test to drive base from 0 to 180
Servo test to drive top from 0 to 180
"""

from time import sleep
import serial


while True:
    try:
        servoSerial = serial.Serial('/dev/ttyUSBServo')
        print('.. servos connected')
        break
    except:
        print('.. servos not found')
        sleep(10)
# {turrets:[{base:512,top:512,laser:false},{base:255,top:255,laser:0}]}
while True:
    command = '{turrets:[{base:512,top:512,laser:false},{base:512,top:512,laser:0}]}\n'
    print(command)
    servoSerial.write(command.encode('utf-8'))
    sleep(1)

    for i in range(0, 255, 5):
        command = '{turrets:[{base:%d,top:90,laser:false},{base:%d,top:90,laser:0}]}\n' % (
            i, i)
        print(command)
        servoSerial.write(command.encode('utf-8'))
        sleep(0.1)

    for i in range(255, 0, -5):
        command = '{turrets:[{base:%d,top:%d,laser:false},{base:%d,top:%d,laser:0}]}\n' % (
            i, i, i, i)
        print(command)
        servoSerial.write(command.encode('utf-8'))
        sleep(0.1)

    for i in range(0, 255, 5):
        command = '{turrets:[{base:90,top:%d,laser:false},{base:90,top:%d,laser:0}]}\n' % (
            i, i)
        print(command)
        servoSerial.write(command.encode('utf-8'))
        sleep(0.1)

    for i in range(255, 0, -5):
        command = '{turrets:[{base:%d,top:%d,laser:false},{base:%d,top:%d,laser:0}]}\n' % (
            i, i, i, i)
        print(command)
        servoSerial.write(command.encode('utf-8'))
        sleep(0.1)
