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



def selecteLoop( ):

    driver.get(url)
    time.sleep(1)

    selectBoxYears = Select(driver.find_element_by_id('mnuYear1'))

    for optionYear in selectBoxYears.options:
        
        yearSearched = optionYear.get_attribute("value")
        print(yearSearched)

        Select(driver.find_element_by_id('mnuYear1')).select_by_visible_text(yearSearched)
        
        selectBoxMakes = Select(driver.find_element_by_id('mnuMake'))
        
        time.sleep(1)

        for optionMake in selectBoxMakes.options:

            makeSearched = optionMake.get_attribute("value")

            time.sleep(1)
            if(makeSearched != ""):
                print(makeSearched)
                
                Select(driver.find_element_by_id('mnuMake')).select_by_visible_text(makeSearched)
                 
                selectBoxModels = Select(driver.find_element_by_id('mnuModel'))

                time.sleep(1)

                for optionModel in selectBoxModels.options:

                    time.sleep(1) 
                    
                    if (optionModel.get_attribute("value")!= ""):
                        print(optionModel.get_attribute("value"))

    # Select year
#    Select(driver.find_element_by_id('mnuYear1')).select_by_visible_text(year)
#    time.sleep(1)
#    
#    # Select make 
#    Select(driver.find_element_by_id('mnuMake')).select_by_visible_text(make)
#    time.sleep(1)
#    
#    # Select model
#    Select(driver.find_element_by_id('mnuModel')).select_by_visible_text(model) 
#
#    driver.find_element_by_id('btnYmm').click()
#    time.sleep(1)
#
  

#EXAMPLE CALL , pass in wtv parameters to test it
selecteLoop()
