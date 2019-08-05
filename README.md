# TEAM110
# Introduction
As many people know, trying to keep up with the ever-fluctuating and always-expensive gas prices
can be very frustrating. Refilling a car's gas tank can sometimes feel like a massive chore, which
a lot of the time it can be. GasUp is an application designed to alleviate the pressure of users finding
a gas station to fill up at, while also saving them money in the process. GasUp supports a variety of
personalizable features, such as setting gas station preferences and preferred payment types, which allows
the user to find the perfect gas station for them. A behind-the-scenes weighting algorithm ensures that
GasUp will find a gas station for the user that is the perfect mix of nearby and least expensive.


# Login Credentials
We have provided an account for certain test cases, which are further explained in the test cases themselves:  
Username: ricoteamtester@gmail.com  
Password: testingcse110

# Requirements
The application should be run on an iPhone X. The device must be connected to WiFi and running an 
iOS version of 12 or higher. The device must have Google Maps installed.

# Installation Instructions 
Install "Expo Client" from the App Store.

# How to Run
**Running:**
1. Open Expo Client.
2. Go to Profile and click "Sign in to your account."
3. Sign in with the username "expotrackerdog" and the password "testing123" and return to the Profile page.
4. Click GA$UP under "Published Projects."


**Restarting:**
1. Shake the device side to side a few times.
2. Click "Reload Manifest and JS Bundle."

# Known Bugs
1. Continue as Guest has issues with app functionality after entering the main page; attempting to access
the profile will result in the app crashing.
2. The GasUp algorithm for getting and sorting stations takes much longer than expected.
3. The first time opening the app, the system will ask for permission to view the user's current location 
twice. Only the second option has the actual functionality; the first will cause a warning.
4. The distances shown on the GasUp results page is the euclidian distance from the current location to the
station. They do not accurately represent the distance to the station via road travel.
5. The server is unstable when multiple users are using the app at the same time. This will potentially cause
connectivity issues.
6. Sometimes after pressing the GasUp button too soon after loading the app, nothing will happen. In this case, 
wait 5 to 10 seconds and then try again.

**7. Sometimes pressing the button will take a long time. If it is not working after 2 minutes, then click the "Back to the Main Page" Button and Click the GasUp button again.**

# Screen Snippet

![alt-image](https://github.com/borayuksel1903/TEAM110/blob/master/images/GasUp-home.png)
