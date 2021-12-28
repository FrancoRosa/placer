from time import sleep
from uart_procesor import get_latlng, get_course
import requests
import serial

url = 'http://localhost:9999'

while True:
    try:
        ser = serial.Serial('/dev/ttyACM0')
        print('.. port connected')
        break
    except:
        print('.. port not found')
        sleep(5)

while True:
    line = ser.readline()
    # print(line)
    if b'$GNGGA' in line:
        location = get_latlng(line)
        print('... send location:', location)
        requests.post(url+'/api/location', json=location)

    if b'$GNVTG' in line:
        heading = get_course(line)
        if heading['heading'] != None:
            print('... send heading:', heading)
            requests.post(url+'/api/heading', json=heading)
