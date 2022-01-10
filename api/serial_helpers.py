from serial.tools.list_ports import comports
from json import dumps
from time import sleep, time
from threading import Thread
from requests import post
import serial

from uart_procesor import get_course, get_latlng

url = 'http://localhost:9999'

laser_connected = False
laser_port = None
gps_connected = False
gps_port = None
gps_logs = []


def format_val(txt, to_ft=True):
    number = float(txt)
    value = number*0.305 if to_ft else number
    return "{value:.2f}".format(value=value)


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
    port_details = comports()
    ports = []
    # ignore bluetooth ports
    for p in port_details:
        port = list(p)
        if not 'BTHENUM' in port[2]:
            ports.append(p[0])

    return ports


def send_to_laser(command):
    global laser_connected
    print(">>>", command)
    if laser_connected:
        try:
            laser_port.write(command.encode())
        except:
            laser_connected = False


def connect_laser():
    global laser_connected, laser_port
    sleep(5)
    print("... connect laser")
    test_command = '{version()}'.encode()
    test_response = 'FIRMWARE'.encode()
    test_response2 = 'FRWR_ESO:163'.encode()
    while True:
        ports = available_ports()
        for test_port in ports:
            print(test_port)
            try:
                laser_connected = False
                laser_port = serial.Serial(
                    test_port, baudrate=38400, timeout=1)
                print(">>>", "sending tst comnad", test_port)
                laser_port.write(test_command)
                response = laser_port.readline()
                print(response.decode())
                if test_port == '/dev/ttyUSB0':
                    laser_connected = True
                    print("... laser connected at:", test_port)
                    while laser_connected:
                        laser_port.cd  # Force an error if serial disconnected
                        sleep(1)
                        # response = laser_port.readline()
                        # if len(response) > 1:
                        #     print("<<<", response.decode())
            except Exception as error:
                print(str(error))
                print("... laser serial error")
            sleep(1)
        sleep(5)


def connect_gps():
    global gps_connected, gps_port, gps_logs
    sleep(4)
    test_command = '$GNGGA'.encode()
    while True:
        ports = available_ports()
        print(ports)
        for test_port in ports:
            try:
                gps_connected = False
                timeout = 2
                gps_port = serial.Serial(
                    test_port, baudrate=115200, timeout=timeout)
                start = time()
                while True:
                    response = gps_port.readline()

                    if test_command in response:
                        gps_connected = True
                        print("... gps connected at:", test_port)
                        while gps_connected:
                            gps_port.cd  # Force an error if serial disconnected
                            response = gps_port.readline()
                            gps_frame_processor(response)

                            try:
                                response = response.decode()
                            except:
                                response = ''
                            gps_logs.append([int(time()), response])
                            if len(gps_logs) > 20:
                                gps_logs = gps_logs[1:]

                    end = time()
                    elapsed = end - start
                    if elapsed > timeout:
                        break
            except Exception as error:
                error_string = str(error)
                print(error_string)
            sleep(1)
        sleep(5)


def gps_frame_processor(line):
    if b'$GNGGA' in line:
        location = get_latlng(line)
        post(url+'/api/location', json=location)

    if b'$GNVTG' in line:
        heading = get_course(line)
        if heading['heading'] != None:
            post(url+'/api/heading', json=heading)


def get_laser():
    global laser_port, laser_connected
    port = laser_port.port if laser_connected else None
    return {"connected": laser_connected, "port": port}


def get_gps():
    global gps_port, gps_connected
    port = gps_port.port if gps_connected else None
    return {"connected": gps_connected, "port": port, "logs": gps_logs}


def set_lsr_on(payload):
    send_to_laser("{on()}") if payload['on'] else send_to_laser("{off()}")


def set_lsr_blink(payload):
    send_to_laser("{flash(1)}") if payload['blink'] else send_to_laser(
        "{flash(0)}")


def set_lsr_config(payload):
    send_to_laser('{floor()}')
    send_to_laser('{cfg("w", %s)}' % format_val(payload['w']))
    send_to_laser('{cfg("h", %s)}' % format_val(payload['h']))
    send_to_laser('{cfg("angle", %s)}' %
                  format_val(payload['a'], to_ft=False))
    send_to_laser('{target(%s, %s, %s)}' % (
        format_val(payload['x']),
        format_val(payload['y']),
        format_val(payload['z']),
    ))


def draw_square(XYdistances, Zdistance):
    send_to_laser('{target(%s, %s, %s)}' % (
        format_val(XYdistances['y']),
        format_val(-Zdistance),
        format_val(XYdistances['x']),
    ))


Thread(target=connect_laser).start()
Thread(target=connect_gps).start()
