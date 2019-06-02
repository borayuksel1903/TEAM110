from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException


##from tabulate import tabulate
import os
import boto3
import json
import time

import firebase_admin
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("./testcarsKey.json")
firebase_admin.initialize_app(cred)


db = firestore.client()



# launch url
url = "https://www.fueleconomy.gov/feg/findacar.shtml"

driver = webdriver.Chrome(executable_path='./chromedriver');

client = boto3.client('s3')
resource = boto3.resource('s3')

listModels = []



def getMPG( year, make , model):


    
    count = 0
    rangeSum = 0
    mpgSum = 0
    avgRange = 0
    avgMpg =0
    noRangeBool = 0

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
        Select(driver.find_element_by_id('rowlimitdisp')).select_by_visible_text('View 200')

        makes=driver.find_elements_by_xpath("//*[starts-with(@id,'chk')]")
        
        searchURL = driver.current_url

        makeyIDS = []

        # get the make IDs for all the types to loop thru all URLs
        for makey in makes:
            makey.click()
            time.sleep(1)
            makeyIDS.append(makey.get_property("id").strip('chk'))
            
       
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
            
                        #mySum = mySum + int(makey.text,10)

        ##print ("Sum is " , rangeSum)
        ##print ("The make has ", count ," models fabricated " )
        ##print ("The average range for the selected make is \n " , float(rangeSum/count))
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
    else:
        returnString = ( "AVG MPG : " , avgMpg)

    return returnString

