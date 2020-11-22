#-------- Imports --------#

# Flask imports
from flask import Flask, render_template, request, Response
from flask_httpauth import HTTPDigestAuth
from threading import Thread

# System imports
import os
import sys
import io
import RPi.GPIO as GPIO

# Custom imports
from robot import Robot
import server



#-------- App Setup --------#

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



#-------- Raspberry Pi setup --------#

# GPIO settings
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# Pi pins
PI_PINS = {

    "LIMIT": 17

}
for pin in PI_PINS:
    GPIO.setup(PI_PINS[pin], GPIO.OUT)
    if pin == "LIMIT":
        GPIO.setup(PI_PINS[pin], GPIO.IN)



#-------- Objects --------#

# Robot object
robot = Robot()



#-------- Functions --------#

# Set the direction
@app.route("/setDirection", methods=["POST"])
def setDirection():
    dir = request.form["data"]
    if (dir == "up"):
        robot.forward()
    elif (dir == "down"):
        robot.backward()
    elif (dir == "right"):
        robot.turnRight()
    elif (dir == "left"):
        robot.turnLeft()
    else:
        print("Couldn't detect direction")
    return ""

# Stop the robot
@app.route("/stop")
def stop():
    robot.stop()
    return ""

# Set extend motor power
@app.route("/setExtendPower", methods=["POST"])
def setExtendPower():
    power = request.form["data"]
    if int(power) == -1:
        robot.retractDown()
    elif int(power) == 1:
        robot.extendUp()
    else:
        print("Couldn't detect extend power")
    return ""

# Set extend motor power to zero
@app.route("/setExtendPowerZero")
def setExtendPowerZero():
    robot.stopExtender()
    return ""

# Set the speed of the robot
@app.route("/setMultiplier", methods=["POST"])
def setMultiplier():
    multiplier = request.form["data"]
    if float(multiplier) == 1.0:
        robot.setNormal()
    elif float(multiplier) == 0.7:
        robot.setSlow()
    return ""    

# Send the name data
@app.route("/setDisplay", methods=["POST"])
def setDisplay():
    text = request.form["data"]
    robot.setDisplay(text)
    return ""

# For debugging
@app.route("/debug", methods=["POST"])
def debug():
    text = request.form["text"]
    print(text)
    return ""



#-------- App Finalization --------#

# Run the app
if __name__ == "__main__":
    Thread(target=server.main, daemon=True).start()
    app.run(debug=True, port=80, host="0.0.0.0")



#-------- After App Ended --------#

# Reset after exit
try:  
    pass
finally:  
    GPIO.cleanup()
    robot.stop()