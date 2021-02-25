import time
import os
import random
import json
import requests
# import redis
from flask_cors import CORS
from flask_socketio import SocketIO
from flask import Flask, send_from_directory
from flask import jsonify

app = Flask(__name__, static_folder='frontend/build')
CORS(app)


app.config['SECRET_KEY'] = 'supasecret!'

socketio = SocketIO(app, cors_allowed_origins='*')
# cache = redis.Redis(host='redis', port=6379)

@socketio.on('connect')
def handle_message():
    # cache.publish("chartdata", "client connecc")
    print('connected!')


@socketio.on('chartdata')
def handle_json(json):
    print('received json: ' + str(json))


@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/data', methods=['POST'])
def get_chart_data():
    data = [
        {"event_type": "type_1", "occurences": random.choice(range(0,50))},
        {"event_type": "type_3", "occurences": random.choice(range(0,50))},
        {"event_type": "type_4", "occurences": random.choice(range(0,50))},
        {"event_type": "type_2", "occurences": random.choice(range(0,50))},
    ]
    # cache.publish("chartdata", json.dumps(data, default=str))
    socketio.emit("chartdata", json.dumps(data, default=str))
    return jsonify(data)

    

if __name__ == '__main__':

    socketio.run(app, host="localhost")