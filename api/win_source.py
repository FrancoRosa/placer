from helpers import distance, is_csv, polygon, cvs_to_rows, rows_to_json, coordinate_distance, xlsx_to_rows, is_csv, create_projs
from flask import Flask, request, jsonify, make_response
from flask_socketio import SocketIO
from flask_cors import CORS
from os import path
from werkzeug.utils import secure_filename
import json
from threading import Thread
from time import sleep, time


UPLOAD_FOLDER = 'cvs_files'

ALLOWED_EXTENSIONS = {'csv', 'xlsx'}

app = Flask(__name__)
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
    'antennaX': 0,
    'antennaY': 0,
    'bay1': 0,
    'bay2': 0,
    'epsg': '2229'
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


@app.route('/')
def index():
    return "... source server running on port %s" % port


@app.route('/api/status', methods=['get'])
def get_status():
    global heading, location
    response = make_response(jsonify({
        **heading,
        **location
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/api/waypoints', methods=['get'])
def get_waypoints():
    global waypoints
    response = make_response(jsonify({
        "waypoints": waypoints,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/api/location', methods=['post'])
def set_location():
    global location, truck, bay_to_waypoint, waypoint, ref_bay, processing_file
    location = request.get_json()
    if not(processing_file):
        truck = polygon(location, heading, config)
        if len(waypoint) > 0:
            bays = truck["bays"]
            bay_to_waypoint = {
                "distance": [
                    coordinate_distance(
                        waypoint[0], {'lat': bays[0][0], 'lng': bays[0][1]}),
                    coordinate_distance(
                        waypoint[1], {'lat': bays[1][0], 'lng': bays[1][1]})
                ]
            }
        broadcast({**heading, **location, **truck, **bay_to_waypoint})

    response = make_response(jsonify({
        "message": True,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/api/heading', methods=['post'])
def set_heading():
    global heading
    heading = request.get_json()
    broadcast({**heading, **location, **truck})
    response = make_response(jsonify({
        "message": True,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/api/config', methods=['post'])
def set_config():
    global config
    config = request.get_json()
    create_projs(config['epsg'])
    response = make_response(jsonify({
        "message": True,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/api/bay', methods=['post'])
def set_ref_bay():
    global ref_bay
    ref_bay = request.get_json()
    response = make_response(jsonify({
        "message": True,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


@app.route('/api/waypoint', methods=['post'])
def set_waypoint():
    global waypoint
    waypoint = request.get_json()
    print('... ', waypoint)
    response = make_response(jsonify({
        "message": True,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


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
    response = make_response(jsonify({
        "message": message, "rows": rows_processed
    }), 200)
    response.headers["Content-Type"] = "application/json"
    processing_file = False
    return response


app.run(debug=False, port=port, host='0.0.0.0')
