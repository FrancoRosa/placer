from serial.tools.list_ports import comports
from json import dumps
from time import sleep, time
from threading import Thread
from requests import post
import serial

from uart_procesor import get_course, get_latlng

url = 'https://localhost:9999'
gps_path = "/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.1:1.0"
compass_path = "/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.2:1.0-port0"

laser_connected = False
laser_port = None

gps_connected = False
gps_port = None
gps_logs = []

compass_connected = False
compass_port = None
compass_yaw = 0


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
                pass
            sleep(1)
        sleep(5)


def connect_gps():
    global gps_connected, gps_port, gps_logs
    sleep(4)
    while True:
        try:
            gps_connected = False
            gps_port = serial.Serial(gps_path, baudrate=115200, timeout=2)
            gps_connected = True
            print("... GPS connected")
            while gps_connected:
                response = gps_port.readline()
                gps_frame_processor(response)

                try:
                    response = response.decode()
                except:
                    response = ''

                gps_logs.append([int(time()), response])
                if len(gps_logs) > 20:
                    gps_logs = gps_logs[1:]

        except Exception as error:
            error_string = str(error)
            print(error_string)
            print("... gps serial error")
            pass
        sleep(5)


def get_degrees(arr):
    angle = ((arr[1] << 8) | arr[0])/32768*180
    angle = angle if angle > 0 else 360-angle
    return round(angle, 1)


def connect_compass():
    global compass_connected, compass_port, compass_yaw
    try:
        compass_connected = False
        compass_port = serial.Serial(compass_path, baudrate=115200, timeout=1)
        while True:
            response = compass_port.readline(20)

            compass_connected = True
            print("... compass connected")
            buffer = b'\x00'*22
            while compass_connected:
                x = compass_port.readline(1)
                buffer = buffer[1:] + x
                if buffer[-2:] == buffer[:2] == b'\x55\x61':
                    compass_yaw = get_degrees([buffer[18], buffer[19]])
                try:
                    response = response.decode()
                except:
                    response = ''

    except Exception as error:
        error_string = str(error)
        print(error_string)
        print("... compass serial error")
        pass
    sleep(5)


def gps_frame_processor(line):
    global compass_connected, compass_yaw

    if b'$GNGGA' in line:
        location = get_latlng(line)
        post(url+'/api/location', json=location, verify=False)

    if compass_connected:
        post(url+'/api/heading', json={'heading': compass_yaw}, verify=False)
    else:
        if b'$GNVTG' in line:
            heading = get_course(line)
            if heading['heading'] != None:
                post(url+'/api/heading', json=heading, validate=False)


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
    send_to_laser('{cfg("flash",250,250)}')
    send_to_laser('{cfg("w", %s)}' % format_val(payload['w']))
    send_to_laser('{cfg("h", %s)}' % format_val(payload['h']))
    send_to_laser('{cfg("angle", %s)}' %
                  format_val(payload['a'], to_ft=False))
    send_to_laser('{target(%s, %s, %s)}' % (
        format_val(payload['x']),
        format_val(payload['y']),
        format_val(payload['z']),
    ))


def draw_square(XYdistances, Zdistance, scale=1):
    if scale == 0:
        scale = 1

    send_to_laser('{target(%s, %s, %s)}' % (
        format_val(XYdistances['y']/scale),
        format_val(-Zdistance),
        format_val(XYdistances['x']/scale),
    ))

    send_to_laser('{flash(1)}' if XYdistances['y'] < 5 else '{flash(0)}')


# Thread(target=connect_laser).start()
Thread(target=connect_compass).start()
Thread(target=connect_gps).start()
