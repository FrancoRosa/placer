from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PORT = 9998

piles = [
    {
        'distance': 1,
        'color': 'black'
    },
    {
        'distance': 2,
        'color': 'black'
    }
]


@app.route('/')
def index():
    return "... rgb server running on port %s" % PORT


@app.route('/api/rgb', methods=['post'])
def set_rgb():
    global piles, timer_counter
    message = False
    data = request.get_json()
    if 'piles' in data:
        timer_counter = 0
        piles = data['piles']
        print(piles)
        message = True

    response = make_response(jsonify({
        "message": message,
    }), 200)
    response.headers["Content-Type"] = "application/json"
    return response


app.run(debug=False, port=PORT, host='0.0.0.0')
