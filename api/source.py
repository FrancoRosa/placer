from flask import Flask, request, jsonify, make_response
from flask_socketio import SocketIO, send
from flask_cors import CORS
from os import path
from platform import system
from werkzeug.utils import secure_filename

from helpers import polygon, cvs_to_rows, rows_to_json, coordinate_distance
from helpers import xlsx_to_rows, is_csv, create_projs, moveLasers
from serial_helpers import available_ports, draw_square, rgb_matrix, get_laser, set_lsr_config, set_lsr_on, set_lsr_blink
import json
import logging


if system == 'Linux':
    from os import uname
    rpi = uname()[4] != 'x86_64'
else:
    rpi = False

UPLOAD_FOLDER = 'cvs_files'
if rpi:
    UPLOAD_FOLDER = '/home/pi/pile-placer/api/cvs_files'

ALLOWED_EXTENSIONS = {'csv', 'xlsx'}

app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
CORS(app)
app.config['SECRET_KEY'] = 'secret'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
socketio = SocketIO(app, cors_allowed_origins="*")

port = 9999

location = {"lat": 0, "lng": 0}
heading = {"heading": 0}
bay_to_waypoint = {"distance": 0}
truck = {"truck": [], "bays": []}
config = {
    'truckLen': 0,
    'truckWid': 0,
    'truckHei': 0,
    'antennaX': 0,
    'antennaY': 0,
    'laserX': 0,
    'laserY': 0,
    'laserZ': 0,
    'reference': 'bay1',
    'bay1': 0,
    'bay2': 0,
    'epsg': '2229',
    'laser_manual': False
}
ref_bay = {}
waypoint = []
waypoints = []
processing_file = False


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def broadcast(val):
    socketio.send(json.dumps(val), broadcast=True)


def send_response(payload):
    response = make_response(jsonify(payload), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/')
def index():
    return "... source server running on port %s" % port


@app.route('/api/status', methods=['get'])
def get_status():
    global heading, location
    return send_response({**heading, **location})


@app.route('/api/waypoints', methods=['get'])
def get_waypoints():
    global waypoints
    return send_response({"waypoints": waypoints})


@app.route('/api/serial_ports', methods=['get'])
def get_serial_ports():
    return send_response({"serial_ports": available_ports()})


@app.route('/api/laser/serial', methods=['get'])
def get_serial_laser():
    return send_response(get_laser())


@app.route('/api/laser/config', methods=['post'])
def set_laser_config():
    global config
    payload = request.get_json()
    config["laser_manual"] = payload["manual"]
    set_lsr_config(payload)
    return send_response({
        "message": True,
    })


@app.route('/api/laser/on', methods=['post'])
def set_laser_on():
    set_lsr_on(request.get_json())
    return send_response({
        "message": True,
    })


@app.route('/api/laser/blink', methods=['post'])
def set_laser_blink():
    set_lsr_blink(request.get_json())
    return send_response({
        "message": True,
    })


@app.route('/api/location', methods=['post'])
def set_location():
    global location, truck, bay_to_waypoint, waypoint, ref_bay, processing_file
    location = request.get_json()
    if not(processing_file):
        truck = polygon(location, heading, config)
        if len(waypoint) > 0:
            bays = truck["bays"]
            bay1dist = coordinate_distance(
                waypoint[0], {'lat': bays[0][0], 'lng': bays[0][1]})
            bay2dist = coordinate_distance(
                waypoint[1], {'lat': bays[1][0], 'lng': bays[1][1]})

            bay_to_waypoint = {
                "distance": [bay1dist["abs"], bay2dist["abs"]],
                "distX": [bay1dist["x"], bay2dist["x"]],
                "distY": [bay1dist["y"], bay2dist["y"]],
            }
            rgb_matrix(waypoint, bay_to_waypoint)

            # Laser turrets

            # lasers = truck["truck"][12:14]
            # laser1dist = coordinate_distance(
            #     waypoint[0], {'lat': lasers[0][0], 'lng': lasers[0][1]})
            # laser2dist = coordinate_distance(
            #     waypoint[1], {'lat': lasers[1][0], 'lng': lasers[1][1]})
            # moveLasers(config["truckHei"], laser1dist, laser2dist)

            # Laser galvo
            reference = config["reference"]
            manual_mode = config["laser_manual"]

            laser = truck["truck"][14]
            laser_index = 0 if reference == "bay1" else 1
            laser_galvo = coordinate_distance(
                waypoint[laser_index], {'lat': laser[0], 'lng': laser[1]})

            if not manual_mode:
                draw_square(laser_galvo, float(config["laserZ"]))

        broadcast({**heading, **location, **truck, **bay_to_waypoint})

    return send_response({"message": True})


@app.route('/api/heading', methods=['post'])
def set_heading():
    global heading
    heading = request.get_json()
    broadcast({**heading, **location, **truck, **bay_to_waypoint})
    return send_response({"message": True})


@app.route('/api/config', methods=['post'])
def set_config():
    global config
    config = {**config, **request.get_json()}
    create_projs(config['epsg'])
    return send_response({
        "message": True,
    })


@app.route('/api/bay', methods=['post'])
def set_ref_bay():
    global ref_bay
    ref_bay = request.get_json()
    return send_response({
        "message": True,
    })


@app.route('/api/waypoint', methods=['post'])
def set_waypoint():
    global waypoint
    waypoint = request.get_json()
    print('... ', waypoint)
    return send_response({
        "message": True,
    })


@app.route('/api/file', methods=['post'])
def process_file():
    global waypoints, config, processing_file
    message = False
    rows_processed = 0
    processing_file = True
    file = request.files['file']
    code = config['epsg']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filedir = path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filedir)
        message = True
        if is_csv(filedir):
            rows = cvs_to_rows(filedir)
        else:
            rows = xlsx_to_rows(filedir)

        waypoints = rows_to_json(rows, code)
        rows_processed = len(waypoints)
    processing_file = False
    return send_response({
        "message": message, "rows": rows_processed
    })


app.run(debug=False, port=port, host='0.0.0.0')
