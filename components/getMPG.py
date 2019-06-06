from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from flask import Flask,request, Blueprint, jsonify
from flask_api import FlaskAPI, status, exceptions
import pyrebase


##from tabulate import tabulate
import os
#import boto3
import json
import time

# Specifying the API with Blueprint
#getMPG_api = Blueprint('getMPG_api', __name__)

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

# launch url
url = "https://www.fueleconomy.gov/feg/findacar.shtml"

#driver = webdriver.Chrome(executable_path='./chromedriver');

#def main ():
#    string = getMPG("2010", "Honda", "Accord")
#    print(string)


#@getMPG_api.route('/getMPG', methods=['GET', 'POST'])
#def getMPG( year, make , model):
@app.route('/getMPG', methods = ['GET', 'POST'])
def getMPG():
    # Not sure how to handle get requests
    if request.method == 'GET':
        return ("Why are you even getting")

    # Store the year, make, and model
    if request.method == 'POST':
        # TODO ask Mihai to see if this is correct (all should be strings)
        year = (request.data.get('year',''))
        car = (request.data.get('car',''))
        #model = (request.data.get('model',''))

    # Start up the chromedriver
    driver = webdriver.Chrome(executable_path='./chromedriver4');

    #parse car into make and model!!!
    if (car.split(None, 1)[0] != "Alfa" or
        car.split(None, 1)[0] != "Aston" or
        car.split(None, 1)[0] != "Land"):
        make = car.split(None, 1)[0]
        model = car.split(None,1)[1]
    elif (car.split(None, 1)[0] == "Alfa" or
        car.split(None, 1)[0] == "Aston"):
        makes = car.split()
        make = makes[0] + ' ' + makes[1]
        model = makes[2]
    else:
        makes = car.split()
        make = makes[0] + ' ' + makes[1]
        if makes[2] == "Discovery":
            model = makes[2]
        else:
            model = makes[2] + ' '+ makes[3]


    # Initialize local variables
    count = 0
    rangeSum = 0
    mpgSum = 0
    avgRange = 0
    avgMpg =0
    noRangeBool = 0

    # Go to url
    driver.get(url)
    time.sleep(1)

    # Select year
    Select(driver.find_element_by_id('mnuYear1')).select_by_visible_text(year)
    time.sleep(1)

    # Select make
    Select(driver.find_element_by_id('mnuMake')).select_by_visible_text(make)
    time.sleep(1)

    # Select model
    Select(driver.find_element_by_id('mnuModel')).select_by_visible_text(model)

    driver.find_element_by_id('btnYmm').click()
    time.sleep(1)

    # Multiple engine sizes for the model
    try:
        driver.find_element_by_id('sort')
        ##print(" Multiple engines")
#        Select(driver.find_element_by_id('rowlimitdisp')).select_by_visible_text('View 10')

        makes=driver.find_elements_by_xpath("//*[starts-with(@id,'chk')]")

        searchURL = driver.current_url

        makeyIDS = []

        i = 0
        # get the make IDs for all the types to loop thru all URLs
        for makey in makes:
            # Scroll to the bottom of page to click
            if i == 4:
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            makey.click()
            time.sleep(1)
            makeyIDS.append(makey.get_property("id").strip('chk'))
            i += 1


        # loop thru all URLs and get the range of each
        for makeyID in makeyIDS:

            carURL = "https://www.fueleconomy.gov/feg/Find.do?action=sbs&id="+makeyID
            driver.get(carURL)



            try:
                rangeText = driver.find_element_by_class_name("totalRange").text
                mpgText = driver.find_element_by_class_name('combinedMPG').text
            except:
                mpgText = driver.find_element_by_class_name('combinedMPG').text
                noRangeBool = 1



            if(noRangeBool == 0):
                rangeEach = [int(s) for s in rangeText.split() if s.isdigit()]
                rangeEachInt = (int)(rangeEach[0])
                rangeSum = rangeSum + rangeEachInt

            mpg = (int)(mpgText)
            mpgSum = mpgSum + mpg
            count = count + 1


        if( noRangeBool == 0):
            avgRange = float(rangeSum/count)

        avgMpg = float(mpgSum/count)

        # go to initial url
        driver.get(searchURL)

    # Single engine size for the model
    except NoSuchElementException:
        print(" One model")
        try:
            rangeText = driver.find_element_by_class_name("totalRange").text
            rangeEachInt = [int(s) for s in rangeText.split() if s.isdigit()]
            avgRange = (int)(rangeEachInt[0])

        except NoSuchElementException:
            print("NOT WORKING")

    if (noRangeBool == 0):
        returnString = ("AVG Range :" , avgRange , "AVG MPG : " , avgMpg)
        data = {
            "Avg Range": avgRange,
            "Avg MPG": avgMpg
        }
    else:
        returnString = ( "AVG MPG : " , avgMpg)
        data = {
            "Avg Range": 200,
            "Avg MPG": avgMpg
        }

    driver.quit()
   # return returnString

    db.child("users").child("Nicole").update(data, user['idToken'])

    # TODO: Need to return in JSON format but unsure how. Mihai???
    #return jsonify(Range=avgRange, MPG=avgMpg)


#import firebase_admin
#import firebase_admin
#from firebase_admin import credentials
#from firebase_admin import firestore

# Use the application default credentials

#import firebase_admin
#from firebase_admin import credentials

#cred = credentials.Certificate("./testcarsKey.json")
#firebase_admin.initialize_app(cred)


#db = firestore.client()




#driver = webdriver.Chrome('./chromedriver');

#client = boto3.client('s3')
#resource = boto3.resource('s3')

#listModels = []


#def selectLoop( ):

#    file = open("carModels.txt", "w")
#    driver.get(url)
#    time.sleep(1)
#    count = 1

#    selectBoxYears = Select(driver.find_element_by_id('mnuYear1'))

#    for optionYear in selectBoxYears.options:

#        year = optionYear.get_attribute("value")
        ##print(year)
#        if((int)(year) == 2016):
#            break
#        Select(driver.find_element_by_id('mnuYear1')).select_by_visible_text(year)

#        selectBoxMakes = Select(driver.find_element_by_id('mnuMake'))

#        time.sleep(1)

#        for optionMake in selectBoxMakes.options:

#            while True:
#                try:
#                    make = optionMake.get_attribute("value")
#                except:
#                    continue
#                break

#            time.sleep(1)
#            if(make != ""):
                ##print(make)


#                Select(driver.find_element_by_id('mnuMake')).select_by_visible_text(make)

#                selectBoxMakes = None

#                while True:
#                    try:
#                        selectBoxModels = Select(driver.find_element_by_id('mnuModel'))
#                    except:
#                        continue
#                    break


#                time.sleep(1)

#                for optionModel in selectBoxModels.options:

#                    while True :
#                            tf = 0
#                            try :
#                                optionModel.get_attribute("value")
#                            except:
#                                print("Here")
#                                tf = tf +1
#                                if (tf > 10):
#                                    raise ValueError
#                                    break
#                            break

#                    if (optionModel.get_attribute("value")!= ""):
                        ##print(optionModel.get_attribute("value"))

#                        while True :
#                            try :
#                                model = optionModel.get_attribute("value")
#                            except:
#                                continue
#                            break

#                        thisDictionary = {
#                            'myId' : count,
#                            'year' : year,
#                            'make': make,
#                            'model': model,
#                        }

#                        listModels.append(thisDictionary)
#                        file.write(str(thisDictionary))
#                        print(thisDictionary)
#                        count = count +1
#                        time.sleep(1)


#    loopThruDictionary(listModels)



#def loopThruDictionary( listModels):

#    for i in range(len(listModels)):

#        myId = listModels[i]["myId"]
#        year = listModels[i]["year"]
#        make = listModels[i]["make"]
#        model = listModels[i]["model"]
#        while True:
#            try:
#                data = getMPG(year, make , model)
#            except:
#                continue
#            break

#        print("ID : ", myId, "\n Year : ", year, "\n Make : " , make ,"\n Model : ", model, "\n Data : \n" , data)

#        doc_ref = db.collection(u'cars').document((year+ " " +make+ " " + model))
#        doc_ref.set({
#            u'ID': myId,
#            u'year': year,
#            u'make': make,
#            u'model': model,
#            u'data': str(data)
#        })




#EXAMPLE CALL , pass in wtv parameters to test it
#main()
