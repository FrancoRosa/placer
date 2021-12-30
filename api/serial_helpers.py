from serial.tools.list_ports import comports
from json import dumps
from time import sleep
import serial

laser_connected = False
laser_port = None


def rgb_matrix(waypoint, bay_to_waypoint):
    rgb_port = serial.Serial('/dev/ttyS0')

    rgb_piles = [
        {
            'distance': 1,
            'color': 'black'
        },
        {
            'distance': 2,
            'color': 'black'
        }
    ]
    rgb_piles[0]['distance'] = int(
        bay_to_waypoint['distance'][0]) if 'color' in waypoint[0].keys() else -1
    rgb_piles[1]['distance'] = int(
        bay_to_waypoint['distance'][1]) if 'color' in waypoint[1].keys() else -1
    rgb_piles[0]['color'] = waypoint[0]['color'].strip(
    ) if 'color' in waypoint[0].keys() else -1
    rgb_piles[1]['color'] = waypoint[1]['color'].strip(
    ) if 'color' in waypoint[1].keys() else -1
    command = "%s\n" % dumps(rgb_piles)
    rgb_port.write(command.encode())


def available_ports():
    ports = comports()
    return list(map(lambda x: x[0], ports))


def connect_laser():
    global laser_connected, laser_port
    test_command = '{version()}'.encode()
    test_response = 'FIRMWARE'.encode()
    while True:
        ports = available_ports()
        for test_port in ports:
            laser_connected = False
            print("... testing:", test_port)
            laser_port = serial.Serial(test_port, baudrate=38400, timeout=0.5)
            laser_port.write(test_command)
            response = laser_port.readline()
            if test_response in response:
                laser_connected = True
                print("... connected", test_port)
                while True:
                    print("...sleep")
                    sleep(1)
            print("...sleep")
            sleep(1)


connect_laser()
