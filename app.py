from flask import Flask, render_template, request, Response
from flask_httpauth import HTTPDigestAuth
from time import sleep
import RPi.GPIO as GPIO
import urllib3
import os

# Get IP
http = urllib3.PoolManager()
r = http.request('GET', 'http://icanhazip.com/') 
print("\n" + r.data)

# App variable
app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(24)

# Authentication
auth = HTTPDigestAuth()
users = {
    "frc": "568"
}
@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None

# HTML when page loaded
@app.route("/")
@auth.login_required
def index():
    return render_template("index.html")



# GPIO settings
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# GPIO pins
LED_PINS = {

    "PWM_R": 25,
    "PWM_L": 23,
    "DIR_R": 12,
    "DIR_L": 24

}

# Setup pins
for pin in LED_PINS:
    GPIO.setup(LED_PINS[pin], GPIO.OUT)
    GPIO.output(LED_PINS[pin], False)

# Directions
DIR = {

    "UP": False,
    "DOWN": False,
    "RIGHT": False,
    "LEFT": False

}

# Set the direction to True
@app.route("/setDirectionTrue", methods=["POST"])
def turnOnLED():
    direction = request.form["DIR"]
    DIR[direction] = True
    return ""

# Set the direction to False
@app.route("/setDirectionFalse", methods=["POST"])
def turnOffLED():
    direction = request.form["DIR"]
    DIR[direction] = False
    return ""



if __name__ == "__main__":
    app.run(debug=True, port=80, host="0.0.0.0")

# Reset after exit
try:  
    pass
except:
    GPIO.cleanup()
finally:  
    GPIO.cleanup()