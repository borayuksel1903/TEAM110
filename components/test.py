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

@app.route('/result', methods = ['GET', 'POST'])
def result():
    if request.method == 'POST':
        #place = (request.data.get('place',''))
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
        payment = request.data.get('payment', '')
        carSetting = request.data.get('carSetting', '')
        data = {
            "shell": shell,
            "seveneleven": seveneleven,
            "seventysix": seventysix,
            "arco": arco,
            "chevron": chevron,
            "costco": costco,
            "mobil": mobil,
            "speedway": speedway,
            "united": united,
            "usa": usa,
            "payment": payment,
            "carSetting": carSetting
        }
        #print(shell)
        #if shell:
            #db.child("users").push(shell, user['idToken'])
            #db.child("users").child("Nicole").set(shell, user['idToken'])
        db.child("users").child("Nicole").update(data, user['idToken'])
        '''
        db.child("users").child(user.localId).update({"seveneleven": seveneleven}, user['idToken'])
        db.child("users").child(user).update({"seventysix": seventysix}, user['idToken'])
        db.child("users").child(user).update({"arco": arco}, user['idToken'])
        db.child("users").child(user).update({"chevron": chevron}, user['idToken'])
        db.child("users").child(user).update({"costco": costco}, user['idToken'])
        db.child("users").child(user).update({"mobil": mobil}, user['idToken'])
        db.child("users").child(user).update({"speedway": speedway}, user['idToken'])
        db.child("users").child(user).update({"united": united}, user['idToken'])
        db.child("users").child(user).update({"usa": usa}, user['idToken'])
        db.child("users").child(user).update({"payment": payment}, user['idToken'])
        db.child("users").child(user).update({"carSetting": carSetting}, user['idToken'])
        '''

        return "No place information is given"
'''
    if request.method == 'POST':
        if place:
		    return db.child("users").child("Bora").get(user['idToken']).val()
        return "No place information is given"
'''



if __name__ == '__main__':
    app.run(debug = True)
