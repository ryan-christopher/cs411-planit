from flask import Flask, json, jsonify, request
import requests  # used to make external API calls

app = Flask(__name__)


@app.route("/")
def landing():
    return {"response": "Success!"}, 200


@app.route("/get_trains_by_line")
def get_line():
    """Takes an MBTA Line from JSON and returns relevant information from MBTA V3 API"""
    req = request.get_json()

    # handles empty input
    if "line" not in req:
        return {"response": "No train line provided"}, 400

    res = requests.get(f"https://api-v3.mbta.com/routes/{req['line']}").json()

    # if invalid line, return error from V3 API with applicable status code
    if "errors" in res:
        status_code = int(res['errors'][0]['status'])
        return {"response": res}, status_code
        
    # returns valid input
    return {"response": res}, 200

if __name__ == "__main__":
    app.run(debug=True)