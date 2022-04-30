from flask import Flask, json, jsonify, request
import requests  # used to make external API calls
from flask_cors import CORS
import os
import dotenv

app = Flask(__name__)
CORS(app, support_credentials=True)
dotenv.load_dotenv("frontend/")

@app.route("/")
def landing():
    return {"response": "Success"}, 200

@app.route("/get_trains_by_line", methods=['POST'])
def get_line():
    """Takes an MBTA Line from JSON and returns relevant information from MBTA V3 API"""
    req = request.get_json()
    # handles empty input
    if "line" not in req:
        return {"response": "No train line provided"}, 200
    
    if not req['line'].isnumeric():
        req['line'] = req['line'].capitalize()
        if "-" in req['line']:
            req['line'] = req['line'][:-1] + req['line'][-1].capitalize()

    res = requests.get(f"https://api-v3.mbta.com/routes/{req['line']}").json()

    # if invalid line, return error from V3 API with applicable status code
    if "errors" in res:
        status_code = int(res['errors'][0]['status'])
        return {"response": res}, status_code
        
    # returns valid input
    return {"response": res}, 200


@app.route('/get_directions_between_coords', methods=['POST'])
def get_directions_between_coords():
    """Given start and end coordinates, return the set of directions along with other route details"""
    req = request.get_json()
    try:
        depart_lat = str(req['depart_lat'])
        depart_lon = str(req['depart_lon'])
        dest_lat = str(req['dest_lat'])
        dest_lon = str(req['dest_lon'])
    except KeyError:
        return {"response": "Invalid Coordinates"}, 400
    if not depart_lat or not depart_lon or not dest_lat or not dest_lon:
        return {"response": "Invalid Coordinates"}, 400
    api_key = os.getenv("GRAPHHOPPERKEY")
    url = f"https://graphhopper.com/api/1/route?point={depart_lat}, {depart_lon}&point={dest_lat}, {dest_lon}&profile=car&locale=en&instructions=true&calc_points=true&key={api_key}"
    graphhopper_path_data = requests.get(url).json()['paths'][0]["instructions"]
    paths = {idx: step['text'] for idx, step in enumerate(graphhopper_path_data)}
    return paths, 200

if __name__ == "__main__":
    app.run(debug=True)