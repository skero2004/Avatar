from flask import Flask, render_template, request, Response
from flask_httpauth import HTTPDigestAuth
from threading import Thread
import os
import sys
import io
import server
import arduino
import pi

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



# Set the direction
@app.route("/setDirection", methods=["POST"])
def setDirection():
    direction = request.form["dir"]
    arduino.robotDir[direction] = 1
    arduino.updateDriveMotors()
    return ""

# Set the direction to 0
@app.route("/setDirectionZero", methods=["POST"])
def setDirectionZero():
    direction = request.form["dir"]
    arduino.robotDir[direction] = 0
    arduino.updateDriveMotors()
    return ""

# Set extend motor power
@app.route("/setExtendPower", methods=["POST"])
def setExtendPower():
    power = request.form["power"]
    arduino.setMotor(arduino.PINS["DIR_EXT"], arduino.PINS["PWM_EXT"], float(power))
    return ""

# Set extend motor power to zero
@app.route("/setExtendPowerZero")
def setExtendPowerZero():
    arduino.setMotor(arduino.PINS["DIR_EXT"], arduino.PINS["PWM_EXT"], 0)
    return ""

@app.route("/setMultiplier", methods=["POST"])
def setMultiplier():
    number = request.form["multiplier"]
    arduino.multiplier["multiplier"] = float(number)
    arduino.updateDriveMotors()
    return ""    



# Run the app
if __name__ == "__main__":
    Thread(target=server.main, daemon=True).start()
    #Thread(target=pi.main, daemon=True).start()
    app.run(debug=True, port=80, host="0.0.0.0")



# Reset after exit
try:  
    pass
finally:  
    pi.GPIO.cleanup()
    for PIN in arduino.PINS:
        arduino.ARDUINO.digitalWrite(arduino.PINS[PIN], arduino.ARDUINO.LOW)