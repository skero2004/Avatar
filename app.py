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
from settings import Settings
from ledMatrix import LEDMatrix
from drive import Drive
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



#-------- Objects --------#

# Settings object includes all setups
settings = Settings()

# Subsystems
ledMatrix = LEDMatrix(settings)
drive = Drive(settings)



#-------- Functions --------#

# Set the direction
@app.route("/setDirection", methods=["POST"])
def setDirection():
    dir = request.form["data"]
    drive.moveRobot(dir)
    return ""

# Stop the robot
@app.route("/stop")
def stop():
    drive.stopRobot()
    return ""

# Set extend motor power
@app.route("/setExtendPower", methods=["POST"])
def setExtendPower():
    power = request.form["data"]
    drive.setMotor(drive.PINS["DIR_EXT"], drive.PINS["PWM_EXT"], float(power))
    return ""

# Set extend motor power to zero
@app.route("/setExtendPowerZero")
def setExtendPowerZero():
    drive.setMotor(drive.PINS["DIR_EXT"], drive.PINS["PWM_EXT"], 0)
    return ""

# Set the speed of the robot
@app.route("/setMultiplier", methods=["POST"])
def setMultiplier():
    multiplier = request.form["data"]
    drive.setMultiplier(multiplier)
    return ""    

# Send the name data
@app.route("/setDisplay", methods=["POST"])
def setDisplay():
    text = request.form["data"]
    ledMatrix.setDisplay(text)
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
    for PIN in settings.ARDUINO_PINS:
        settings.ARDUINO.digitalWrite(settings.ARDUINO_PINS[PIN], settings.ARDUINO.LOW)