from flask import Flask
import googlemaps
import gmaps
import json

gmaps.configure(api_key = #API_KEY)
pyMaps = googlemaps.Client(key= #API_KEY)

app = Flask(__name__)

# Functions to call when at the basic localhost URL
@app.route('/')

# Function that calls other funcs to get relevant data, calculates search
# radius, and returns a string of all the data to be rendered
def mainFunc():
    # Get all the relevant data
    lat, lng = getGeoLocation()
    MPG = getCarMPG()
    gasLeft = getGasRemaining()
    drivingRange = MPG * gasLeft

    stationList=getStationsWithinRange(lat,lng,drivingRange)

    returnString = "<h3>If you see this, it might not be broken</h3><br/>"\
                   + "Location (latitude,longitude): (" + str(lat)\
                   + ", " + str(lng) + ")<br/>" + "MPG: " + \
                   str(MPG) + "<br/>" + "Gas Left: " + str(gasLeft) + \
                   " gallons<br/>" + "Maximum Range: " + str(drivingRange)\
                   + " miles<br/>"

    stationString = "<br/>"
    for station in stationList:
        stationString = stationString + stationList[station] + str(station) + "<br/>"

    returnString = returnString + stationString

    fig = gmaps.figure()

    layer = gmaps.directions.Directions((32.8800332, -117.23820479999999), (32.8712214, -117.2333864), mode='car')

    fig.add_layer(layer)
    
    return fig

# Function that gets the user's location in latitude/longitude --- returns a float 2-tuple
def getGeoLocation():
    # Call using google API that gets a JSON with lat/lng and accuracy
    
    geolocateResult = pyMaps.geolocate()
    
    # Indexing JSON object to get specific latitude and longitude
    
    lat = geolocateResult['location']['lat']
    lng = geolocateResult['location']['lng']
    
    return (lat,lng) #(32.8794112,-117.23816959999998)

# Function that gets the MPG of the user's car --- returns an int
def getCarMPG():
    # TODO: get actual car MPG
    return 30

# Function that gets how much gas the user's car has left --- returns an int
def getGasRemaining():
    # TODO: get actual amount of gas left (in gallons?)
    return 4

# Function that gets a list of all the gas stations inside the given range
def getStationsWithinRange(lat, lng, range):
    # TODO: google API call to get gas stations
    
    stationList = pyMaps.places_nearby(location=(lat,lng),radius=4000,\
        type="gas_station")

    stationDict = {}

    for station in stationList["results"]:
        location = (station["geometry"]["location"]["lat"],station["geometry"]["location"]["lng"])
        stationDict[location] = station["name"]

    return stationDict

def getTopFiveStations(stationList):
    # TODO: calculate the best five gas stations to go to
    return

@app.route("/TEST")
def aownd():
    return "look at me"
