from serial.tools.list_ports import comports
from json import dumps
from time import sleep
from threading import Thread
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


def send_to_laser(command):
    global laser_connected
    if laser_connected:
        try:
            laser_port.write(command.encode())
        except:
            laser_connected = False


def connect_laser():
    global laser_connected, laser_port
    test_command = '{version()}'.encode()
    test_response = 'FIRMWARE'.encode()
    while True:
        ports = available_ports()
        for test_port in ports:
            laser_connected = False
            laser_port = serial.Serial(test_port, baudrate=38400, timeout=0.5)
            laser_port.write(test_command)
            response = laser_port.readline()
            if test_response in response:
                laser_connected = True
                print("... laser connected at:", test_port)
                while laser_connected:
                    sleep(1)
            sleep(1)


def get_laser():
    global laser_port, laser_connected
    port = laser_port.port if laser_connected else None
    return {"connected": laser_connected, "port": port}


Thread(target=connect_laser).start()
