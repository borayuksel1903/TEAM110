from flask import Flask , redirect, url_for, request, jsonify
import googlemaps
import json
import pprint
from flask_api import FlaskAPI, status, exceptions
from getMPG import getMPG
#from getPrices import getPrices
import pyrebase
from gasUp import getStationsWithinRange, sortByPrice, sortByDistance, sortByPreference, getStations
from geopy.geocoders import Nominatim
from getPricesWithAddress import getPrices


# Set up the client with the API key
geolocator = Nominatim(user_agent="rico")

maps = googlemaps.Client(key= "AIzaSyDmH8hyjX9rAWQ1i1ZxxNoF-S-wbC3wnaQ")

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

# Functions to call when at the basic localhost URL
@app.route('/')

# Function that calls other funcs to get relevant data, calculates search
# radius, and returns a string of all the data to be rendered
def mainFunc():

    # Get all the relevant data
    lat, lng = getGeoLocation()
    gasLeft = getGasRemaining()
    drivingRange = MPG * gasLeft

    # Get a list of stations within the specified radius
    stationList=getStationsWithinRange(lat,lng,5)

    # Set up a return string for flask rendering (to see if output is corect)
    returnString = "<h3>If you see this, it might not be broken</h3><br/>"\
                   + "Location (latitude,longitude): (" + str(lat)\
                   + ", " + str(lng) + ")<br/>Gas Left: " + str(gasLeft) + \
                   " gallons<br/>" + "Maximum Range: " + str(drivingRange)\
                   + " miles<br/>"

    # Format the stations and their coordinates nicely
    stationString = "<br/>"
    for station in stationList:
        stationString = stationString + stationList[station] + str(station) + "<br/>"

    # Add the list of stations and their coordinates to the return string
    returnString = returnString + stationString

    # Coordinates of a few nearby stations (for testing distance matrix)
    nearbyList = [(32.8712214, -117.2333864), (32.9336002, -117.2399549),\
        (32.9371616, -117.2309449)]

    # Get a distance/time matrix from current location to each destination
    distanceMatrix = maps.distance_matrix(origins=(lat,lng), destinations=nearbyList,\
        mode="driving")

    # Print formatted distanceMatrix dict
    pprint.pprint(distanceMatrix)

    return returnString + "<br/><br/>" + pprint.pformat(distanceMatrix)

@app.route('/test',methods=['GET','POST'])
def preferancesJson():

    if request.method == 'GET':
        return ("startLocation")
    if request.method == 'POST':

        lat = (request.data.get('lat',''))
        lng = (request.data.get('lng',''))
        tank = (request.data.get('tank',''))

        data = { "tank":tank}

        db.child("users").child(userStr).update(data, user['idToken'])

        yourStationList=getStationsWithinRange(lat,lng,5)


        myList=[]
        stationData = {}
        for station in yourStationList:
            location = maps.reverse_geocode((station[0], station[1])) #this gives exception because str(station) is in parentheses, need to parse
            streetAddress = location[0]['address_components'][1]['long_name']
            streetNumber = location[0]['address_components'][0]['long_name']
	    myList.append(streetNumber + " " + streetAddress)

	
	stations = getPrices(["3233 La Jolla Village"])
	stations = getStations(stations)
	results = sortByPreference(stations, driver)



	    #print(location[0])
            #print(streetNumber + " " + streetAddress)

            #price = getPrices(streetNumber + " " + streetAddress) #calling getPrices from getPrices.py
            #stationData.update(price)

        # print("Here")
        #stationData = sortByPrice(stationData)
        #print(stationData)

        return myList
        #return jsonify(yourStationList)


notes = {
    0: 'do the shopping',
    1: 'build the codez',
    2: 'paint the door',
}

def note_repr(key):
    return {
        'url': request.host_url.rstrip('/') + url_for('notes_detail', key=key),
        'text': notes[key]
    }


@app.route('/example/')
def example():
    return {'request data': request.data}

# Function that gets the user's location in latitude/longitude --- returns a float 2-tuple
def getGeoLocation():
    # Call using google API that gets a JSON with lat/lng and accuracy
    geolocateResult = maps.geolocate()

    # Indexing JSON object to get specific latitude and longitude
    lat = geolocateResult['location']['lat']
    lng = geolocateResult['location']['lng']

    return (lat,lng) #(32.8794112,-117.23816959999998)

# Function that gets the MPG of the user's car --- returns an int

@app.route('/getMPG',methods=['POST'])
def getMPGRequest():
    if request.method == 'POST':

        year = (request.data.get('year',''))
        car = (request.data.get('car',''))

        data = getMPG(year,car)
        db.child("users").child(userStr).update(data, user['idToken'])

        return (str(data))


@app.route('/getPrices',methods=['POST'])
def getPricesRequest():
    if request.method == 'POST':


        address = (request.data.get('address',''))
        myDataString = getPrices(address)

        print(myDataString)
        return (str(myDataString))


@app.route('/result', methods = ['GET', 'POST'])
def result():
    if request.method == 'POST':
        #place = (request.data.get('place',''))
        gasStations = request.data.get('gasStations', '')
        otherStations = request.data.get('otherStations', '')
        '''
        shell = request.data.get('shell', '')
        seveneleven = request.data.get('seveneleven', '')
        seventysix = request.data.get('seventysix', '')
        arco = request.data.get('arco', '')
        chevron = request.data.get('chevron', '')
        costco = request.data.get('costco', '')
        mobil = request.data.get('mobil', '')
        speedway = request.data.get('speedway', '')
        united = request.data.get('united', '')
        usa = request.data.get('usa', '')
        '''
        payment = request.data.get('payment', '')
        year = request.data.get('year', '')
        car = request.data.get('car', '')
        #otherStations = request.data.get('otherStations', '')

        data = {
            "gasStations": gasStations,
            "otherStations": otherStations,
            "payment": payment,
            "year": year,
            "car": car,
        }
        #print(shell)
        #if shell:
            #db.child("users").push(shell, user['idToken'])
            #db.child("users").child("Nicole").set(shell, user['idToken'])

        db.child("users").child(userStr).update(data, user['idToken'])
	

        return "No place information is given"
'''
    if request.method == 'POST':
        if place:
		    return db.child("users").child("Bora").get(user['idToken']).val()
        return "No place information is given"
'''


# Function that gets how much gas the user's car has left --- returns an int
def getGasRemaining():
    # TODO: get actual amount of gas left (in gallons?)
    return 4

def getTopFiveStations(stationList):
    # TODO: calculate the best five gas stations to go to
    return


if __name__ == '__main__':
    app.run()
