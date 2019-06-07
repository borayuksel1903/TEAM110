#from flask import Flask , redirect, url_for, request, jsonify
import googlemaps
import json
import pprint
from flask_api import FlaskAPI, status, exceptions
from getMPG import getMPG
from getPrices import getPrices
import pyrebase
#from gasUp import getStationsWithinRange, sortByPrice, sortByDistance, sortByPreference, getStations

# Set up the client with the API key
maps = googlemaps.Client(key= "AIzaSyDmH8hyjX9rAWQ1i1ZxxNoF-S-wbC3wnaQ")

#app = FlaskAPI(__name__)
config = {
  "apiKey": "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  "authDomain": "ricoauth.firebaseapp.com",
  "databaseURL": "https://ricoauth.firebaseio.com",
  "projectId":"ricoauth",
  "storageBucket": "ricoauth.appspot.com",
   "messagingSenderId": "748133694175"
}
#firebase = firebase.FirebaseApplication('https://ricoauth.firebaseio.com', None)
firebase = pyrebase.initialize_app(config)
db = firebase.database()
auth = firebase.auth()
#authenticate a user
user = auth.sign_in_with_email_and_password("byuksel@uc.edu", "bora123")
userList = user['email'].split('@')
userStr = userList[0]

def getStations(locations):
    # api-endpoint
    data = {}
    for names in locations:
        URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + lat + ', ' + long + '&destinations=' + names + '&key=' + API_KEY

        # sending get request and saving the response as response object
        r = requests.get(url=URL)

        # extracting data in json format
        data[names] = r.json()
        locations[names].update({'Distance' : str(data[names]['rows'][0]['elements'][0]['distance']['text']).strip(' mi')})

    return locations


# Takes distance data from getStations function (stations dict)
# Returns Gas Station dict {name, {Location, Distance (in miles)}}
def sortByDistance(stations):
    sorted_x = sorted(stations.items(), key=lambda kv: (kv[1]['Distance']))
    sorted_dict = collections.OrderedDict(sorted_x)
    return sorted_dict


# Take price data from web scraper (locations dict)
# Returns GasStation dict {name, {Location, Price (in dollars)}}

def sortByPrice(stations):

    sorted_x = sorted(stations.items(), key=lambda kv: (kv[1]['price']))
    sorted_dict = collections.OrderedDict(sorted_x)
    return sorted_dict

def sortByPreference(stations, driver):
    if(driver['otherStations'] == True):
        return stations
    else:
        preferences = {}
        results = {}
        for type, value in driver['gasStations'].items():
            if (value == True):
                preferences.update({type: value})

        for places in stations.items():
            if(places[1]['name'] in preferences):
                results.update({places[0] : places[1]})

        if(len(results) == 0):
            return stations

        results = sortByDistance(results)

        for i in stations.items():
            if(not i[1]['name'] in preferences):
                results.update({i[0] : i[1]})
        return results

# Function that gets a list of all the gas stations inside the given range --- returns a dict of (latitude,longitude)=stationName
def getStationsWithinRange(lat, lng, range):

    # Convert the input range(miles) to meters
    rangeInMeters = range*1609.34

    # Make google maps API call to get gas stations within range
    stationList = maps.places_nearby(location=(lat,lng), \
        radius=rangeInMeters, type="gas_station")

    # Setup a dict of stations; the coordinates are the key, and the corresponding station name is the data
    stationDict = {}
    for station in stationList["results"]:
        location = (station["geometry"]["location"]["lat"],station["geometry"]["location"]["lng"])
        stationDict[location] = station["name"]

    return stationDict
