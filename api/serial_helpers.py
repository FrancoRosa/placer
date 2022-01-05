from serial.tools.list_ports import comports
from json import dumps
from time import sleep, time
from threading import Thread
import serial

laser_connected = False
laser_port = None
gps_connected = False
gps_port = None


def format_val(txt):
    return "{value:.1f}".format(value=float(txt))


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
    test_command = '{version()}'.encode()
    test_response = 'FIRMWARE'.encode()
    while True:
        ports = available_ports()
        for test_port in ports:
            try:
                laser_connected = False
                laser_port = serial.Serial(
                    test_port, baudrate=38400, timeout=0.5)
                laser_port.write(test_command)
                response = laser_port.readline()
                if test_response in response:
                    laser_connected = True
                    print("... laser connected at:", test_port)
                    while laser_connected:
                        laser_port.cd  # Force an error if serial disconnected
                        sleep(1)
            except:
                print("... laser serial error")
                pass
            sleep(1)
        sleep(5)


def connect_gps():
    global gps_connected, gps_port
    test_command = '$GNGGA'.encode()
    while True:
        ports = available_ports()
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
                            sleep(1)

                    end = time()
                    elapsed = end - start
                    if elapsed > timeout:
                        break
            except:
                print("... gps serial error")
                pass
            sleep(1)
        sleep(5)


def get_laser():
    global laser_port, laser_connected
    port = laser_port.port if laser_connected else None
    return {"connected": laser_connected, "port": port}


def set_lsr_on(payload):
    send_to_laser("{on()}") if payload['on'] else send_to_laser("{off()}")


def set_lsr_blink(payload):
    send_to_laser("{flash(1)}") if payload['blink'] else send_to_laser(
        "{flash(0)}")


def set_lsr_config(payload):
    send_to_laser('{cfg("w", %s)}' % format_val(payload['w']))
    send_to_laser('{cfg("h", %s)}' % format_val(payload['h']))
    send_to_laser('{target(%s,%s,%s)}' % (
        format_val(payload['x']),
        format_val(payload['y']),
        format_val(payload['z']),
    ))


def draw_square(XYdistances, Zdistance):
    send_to_laser('{target(%s,%s,%s)}' % (
        format_val(XYdistances['x']),
        format_val(XYdistances['y']),
        format_val(Zdistance),
    ))


Thread(target=connect_laser).start()
Thread(target=connect_gps).start()
