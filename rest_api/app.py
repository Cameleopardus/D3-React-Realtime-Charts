import time
import os
import redis
from flask import Flask, send_from_directory
from flask import jsonify
import random
from flask_cors import CORS
app = Flask(__name__, static_folder='frontend/build')
CORS(app)

cache = redis.Redis(host='redis', port=6379)

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/data')
def get_chart_data():
    data = [
        {"event_type": "type_1", "occurences": random.choice(range(0,50))},
        {"event_type": "type_3", "occurences": random.choice(range(0,50))},
        {"event_type": "type_4", "occurences": random.choice(range(0,50))},
        {"event_type": "type_2", "occurences": random.choice(range(0,50))},
    ]
    return jsonify(data)