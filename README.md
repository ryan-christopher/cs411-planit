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


## Challenges and Next Steps:

When developing this app, we ran into time constraints that limited our ability to add or fully implement features that were initially planned for the project. Most of the constraints we dealt with involved incorporating APIs that we did not have time to utilize (MBTA) or APIs which were private (Instagram).

One acute technical challenge was determining a method to store a user's liked locations in our SQLite database. We had initially decided to use two separate tables -- one for Users and one for Likes, which would be mapped using foreign keys. However, due to time constraints and complications in implementing the two tables, we were only able to implement the Users table. To get around this issue we took cues from PostgreSQL, which allows for relational tables to have JSON-like fields within them. The approach to this was to maintain a dictionary of the user's liked locations and update that field inside of their entry in our SQLite database. However, because SQLite does not natively support JSON fields, we saved the dictionaries as raw text and converted back and forth between String and JSON whenever changes needed to be made. While this is an unconventional approach and certainly not a scalable one, it was suitable for the challenge we were facing at the time.

Another technical challenge was storing a user's information in our database when they logged in; because we used Google OAuth for login functionality, we never presented users with a form to enter their information into our site. Thus, we did not initially have a way to access their data and store information about them in our database. After researching Google OAuth, we discovered that Google's API allows developers to access some information from a user's Google account if an application made a request to Google while providing the application key and the user's authorization token. Doing this, we were able to access the user's name and email address, which was the information we were hoping to store in the database. We implemented a React Hook that automatically submits a request to Google when a user logs in for the first time to grab their data from Google and populate our database with it. 

In terms of next steps, we would like to find a way to incorporate more APIs in the project. At the moment the application is able to find places near a user (within certain categories) and provide directions to those places, but we were also interested in providing recommendations to users and to allow for social features like liking and sharing with friends. We would also like to tidy up the database more by fully implementing the likes feature in a scalable way.
