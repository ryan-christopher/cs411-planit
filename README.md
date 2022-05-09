# CS411 Project: Planit

Section A5 Group #2

Team Members: Abdul Ka, Jayden Font, Kevin Martin, Lauren Pearson, Rachel Ferrigno, Ryan Christopher

## What is Planit?:

Planit is a web app planner that allows you to quickly find events and areas of interests throughout your day. Wether it is finding a restaurant, going to a park, finding a new venue for a concert, or even a gym, Planit will help you quickly find your next destination. Life moves fast, we help you plan it. 

## Our frameworks:

We are using React for the frontend and Flask for the backend. In addition to those, we are using a SQLite database which allows us to store a users favorited locations. Our team felt that using React and Flask with SQLite was a way for our team to have experience in new frameworks while creating our application. 

## How to run the project: 

### API Keys:

Since this is not a production build, you will need to obtain API keys in order for this application to work as intended. We use the GraphHopper Directions API, the Yelp Fusion API, and a Google Client ID for OAuth. Both the GraphHopper and Yelp APIs are free, and getting a Google Client ID is free as well. In order to get a GraphHopper API key, you can sign up via their website, and for the Yelp Fusion API you can obtain an API key by logging into your Yelp consumer account, then going to Developers>Yelp Fusion>Manage App. 

Once you have the three keys, you will need to create three .env files. One in the backend, one in the front end, and one in the root folder. The API keys will need to be named "GRAPHHOPPERKEY", "YELP_API_KEY", and "GOOGLECLIENTID" in the backend folder. For the frontend and root folders, you will need to add "REACT_APP_" to the beginning of each variable name (for example, instead of "GRAPHHOPPERKEY" you will have "REACT_APP_GRAPHHOPPERKEY"). 

### Installing Required Packages:

In order to ensure that your machine has the required packages, there are two steps. For the backend, open a terminal in the backend folder and run the command "pip install -r requirements.txt" to install the required python packages. Then navigate to the frontend folder and run the command "npm install" to install the required node packages. 


### Running the project:

Now that you have the required API keys and packages, navigate to the backend folder and run the python file titled "app.py." Once the backend server is active, go to the frontend folder and run the command "npm start" in the terminal to start the frontend server. You should then be able to log in using your Google account (if you are a user who has been added to the project) and you will be able to use the application!
