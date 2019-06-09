# import necessary selenium stuff
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from geopy.geocoders import Nominatim

# import json
import time


# Get the prices of gas stations nearby the address
def getPrices( address ):
    geolocator = Nominatim(user_agent="app")

    # setup the webdriver for chrome with the local executable

	
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(options=options)  

    # go to gasbuddy.com
    driver.get("https://www.gasbuddy.com")

    # search nearby stations with our current zipcode
    searchBar = driver.find_element_by_name("search")
    searchBar.clear()
    searchBar.send_keys(address)
    searchBar.send_keys(Keys.RETURN)

    time.sleep(3)

    '''
    # get to an appropriate amount of search results
    moreStationsButton = driver.find_element_by_xpath("""//*[@id="container"]/div/div[3]/div/div/div[1]/a""")
    moreStationsButton.click()
    time.sleep(2)
    moreStationsButton.click()
    time.sleep(2)
    moreStationsButton.click()
    time.sleep(2)
    print("Here")
    '''


    # get the station names, addresses, and prices
    while(True):
        try:
            stationNames = driver.find_elements_by_css_selector('h3.header__header3___1b1oq.header__header___1zII0.header__snug___lRSNK.GenericStationListItem__stationNameHeader___1an6Y')
            if ( len(stationNames)==0):
                continue
        except:
            continue
        break

    stationAddresses = driver.find_elements_by_class_name('GenericStationListItem__address___FMCk7')
    stationPrices = driver.find_elements_by_class_name('GenericStationListItem__price___vxvav')

    # set up final dict of station data
    stationData = {}
    # populate dict with actual station information
    for stationIndex in range(len(stationNames)):
        # if no price, i.e. station is not in operation, ignore it
        if stationPrices[stationIndex].text == '---':
            continue

        # make the addresses more readable
        addressArray = stationAddresses[stationIndex].text.split('\n')
        stationAddress = addressArray[0]

        # remove extra characters from the prices
        priceArray = stationPrices[stationIndex].text.split('$')
        stationPrice = priceArray[1]

        # add the name and price for the address in question
        location = geolocator.geocode(stationAddresses[stationIndex].text.split('\n')[0])
        stationData[stationAddress] = {}
        stationData[stationAddress]['name'] = stationNames[stationIndex].text
        stationData[stationAddress]['price'] = stationPrice
        stationData[stationAddress]['lat'] = location.latitude
        stationData[stationAddress]['lng'] = location.longitude


    print(stationData)
    return stationData
