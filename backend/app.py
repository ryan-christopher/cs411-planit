from flask import Flask, json, jsonify, request
import requests  # used to make external API calls
from flask_cors import CORS
import json
import os
import dotenv
from flask_wtf import FlaskForm #creates forms for the db
from wtforms import StringField, SubmitField #create string fields for db
from wtforms.validators import DataRequired #constraints for db
from flask_sqlalchemy import SQLAlchemy #libary to create database
from datetime import datetime #keep track when things are added to db
from flask_login import LoginManager #Used Flask-Login to make a LoginManager class
from flask_migrate import Migrate

login_manager = LoginManager() 

app = Flask(__name__)
login_manager.init_app(app) #configuring the object for login
CORS(app, support_credentials=True)
dotenv.load_dotenv("frontend/")

#Add Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

#Initialize Database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# stores user object for current session, updated upon login with Google
user = None

#Create Model Users
class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True) #unique integer id
    name = db.Column(db.String(200), nullable=False)#users name
    email = db.Column(db.String(120), nullable=False, unique=True)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    likes = db.Column(db.Text())  # stores liked venues as json in string type

    #Create a String
    def __str__(self):
        return str({
            'id': self.id, 'name': self.name,
            'email': self.email, 'date_added': self.date_added.strftime("%b %d, %Y"), 
            'likes': self.likes
            })

#Create a form clas for db
class UserForm(FlaskForm):
    name = StringField("Name", validator=[DataRequired()])
    email = StringField("Email", validator=[DataRequired()])
    submit = SubmitField("Submit")


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


@app.route("/register_google_data", methods=['POST'])
def register_google_data():
    """Registers user in DB from Google OAuth and saves their id for this session"""
    req = request.get_json()
    query = Users.query.filter_by(email=req["email"]).first()
    if not query:
        query = Users(name=req['name'], email=req['email'], likes=str({}))
        db.session.add(entry)
        db.session.commit()
    os.environ['USERID'] = str(query.id)
    print(os.environ['USERID'])
    return "", 200


@app.route("/add_like_to_user", methods=['POST'])
def add_like_to_user():
    req = request.get_json()
    if not req and not req['venue']:
        return "Error: Venue not provided", 400
    if 'USERID' not in os.environ:
        return "Error: Please Sign in", 400
    user = Users.query.filter_by(id=os.environ['USERID']).first()
    if not user:
        return "Error: User not found. You probably need to sign in", 400
    
    # add the new venue to the user's likes
    curr_likes = dict(json.loads(user.likes.replace('\'', "\"")))
    curr_likes[req['venue']] = req
    setattr(user, "likes", str(curr_likes))

    # update database
    db.session.delete(user)
    db.session.add(user)
    db.session.commit()
    return "", 200

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)