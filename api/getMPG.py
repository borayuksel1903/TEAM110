from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException

import os
import json
import time
from selenium.webdriver.chrome.options import Options

# launch url
url = "https://www.fueleconomy.gov/feg/findacar.shtml"

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

def parseCar(car):
    if (car.split(None, 1)[0] != "Alfa" and car.split(None, 1)[0] != "Aston" and car.split(None, 1)[0] != "Land"):
        make = car.split(None, 1)[0]
        model = car.split(None,1)[1]
    elif (car.split(None, 1)[0] == "Alfa" or car.split(None, 1)[0] == "Aston"):
        makes = car.split()
        make = makes[0] + ' ' + makes[1]
        model = makes[2]
    else:
        makes = car.split()
        make = makes[0] + ' ' + makes[1]
        if makes[2] == "Discovery":
            model = makes[2]
        else:
            print(car)
            model = makes[2] + ' '+ makes[3]

    returnDict = {
        "make":make,
        "model":model
    }

    return returnDict

def getMPG( year, car):

    # Create a dictionary for the cars
    myDict = parseCar(car)

    make = myDict["make"]
    model = myDict["model"]

    # Initialize values
    count = 0
    rangeSum = 0
    mpgSum = 0
    avgRange = 0
    avgMpg =0
    noRangeBool = 0

    # Get to the page
    driver.get(url)
    time.sleep(1)

    # Select year
    Select(driver.find_element_by_id('mnuYear1')).select_by_visible_text(year)
    time.sleep(1)

    print(make)
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
        Select(driver.find_element_by_id('rowlimitdisp')).select_by_visible_text('View 200')

        makes=driver.find_elements_by_xpath("//*[starts-with(@id,'chk')]")

        searchURL = driver.current_url

        makeyIDS = []

        i=0
        # get the make IDs for all the types to loop thru all URLs
        for makey in makes:

            driver.execute_script("arguments[0].scrollIntoView();", makey)			
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
            rangeEach = [int(s) for s in rangeText.split() if s.isdigit()]
            mpgText = driver.find_element_by_class_name('combinedMPG').text
            avgMpg = (int)(mpgText)
            avgRange = (int)(rangeEach[0])
        except:
            try:
                mpgText = driver.find_element_by_class_name('combinedMPG').text
                avgMpg = (int)(mpgText)
            except:
                avgMpg = 24
                try:
                    rangeText = driver.find_element_by_class_name("totalRange").text
                    avgRange = (int)(rangeText)
                except:
                    avgRange = 200

    data = {
        "Avg Range": avgRange,
        "Avg MPG": avgMpg
    }


    return data
