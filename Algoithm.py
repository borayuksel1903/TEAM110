# importing the requests library
import requests
import googlemaps
import collections
from flask import Flask, request
import pyrebase
from flask_api import FlaskAPI, status, exceptions

app = FlaskAPI(__name__)
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
driver = db.child("users").child(userStr).get(user['idToken']).val()


# your API key here
API_KEY = "AIzaSyDmH8hyjX9rAWQ1i1ZxxNoF-S-wbC3wnaQ"

# Get current location
gmaps = googlemaps.Client(key=API_KEY)
loc = gmaps.geolocate()
lat = str(loc['location']['lat'])
long = str(loc['location']['lng'])

locations = {'3233 La Jolla Village Dr': {'name': 'mobil', 'price': '4.35'},
             '8505 Costa Verde Blvd': {'name': 'chevron', 'price': '4.09'},
             '2204 Torrey Pines Rd': {'name': 'shell', 'price': '4.05'},
             '9413 Voigt Dr, La Jolla, CA': {'name': 'seventysix', 'price': '5.05'}}

gasStation = ['arco', 'chevron', 'costco', 'mobil', 'usa', 'united', 'speedway', 'shell', 'seventysix', 'seveneleven', 'otherStations']
# Takes Gas Station address (locations dict)
# Calls Google Maps to get data of each gas stations in JSON file
# Returns dict of gas station information (Distance, driving time, operating time, etc.)
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
                #print(stations)

        results = sortByDistance(results)

        for i in stations.items():
            if(not i[1]['name'] in preferences):
                results.update({i[0] : i[1]})
        return results

stations = getStations(locations)

#results = sortByDistance(stations)
#results = sortByPrice(stations)
results = sortByPreference(stations, driver)
print(results)

