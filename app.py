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
PINS = {

    "PWM_R": 25,
    "PWM_L": 23,
    "DIR_R": 12,
    "DIR_L": 24

}

# Setup pins
for pin in PINS:
    GPIO.setup(PINS[pin], GPIO.OUT)
    GPIO.output(PINS[pin], False)

# Setup PWM (20 KHz)
PWM_MAX = 100
rightMotorPWM = GPIO.PWM(PINS["PWM_R"], 20)
rightMotorPWM.start(0)
rightMotorPWM.ChangeDutyCycle(0)
leftMotorPWM = GPIO.PWM(PINS["PWM_L"], 20)
leftMotorPWM.start(0)
leftMotorPWM.ChangeDutyCycle(0)

# Directions
DIR = {

    "UP": 0,
    "DOWN": 0,
    "RIGHT": 0,
    "LEFT": 0

}

# Motor functions

def setMotorRight(power):
    
    if power < 0: 
        # Reverse mode
        GPIO.output(PINS["DIR_R"], False)
        pwm = -int(PWM_MAX * power)
        if pwm > PWM_MAX:
            pwm = PWM_MAX
    elif power > 0:
        # Forward mode
        GPIO.output(PINS["DIR_R"], True)
        pwm = int(PWM_MAX * power)
        if pwm > PWM_MAX:
            pwm = PWM_MAX
    else:
        # Stop mode
        GPIO.output(PINS["DIR_R"], False)
        pwm = 0
    
    rightMotorPWM.ChangeDutyCycle(pwm)

def setMotorLeft(power):

    if power < 0: 
        # Reverse mode
        GPIO.output(PINS["DIR_L"], False)
        pwm = -int(PWM_MAX * power)
        if pwm > PWM_MAX:
            pwm = PWM_MAX
    elif power > 0:
        # Forward mode
        GPIO.output(PINS["DIR_L"], True)
        pwm = int(PWM_MAX * power)
        if pwm > PWM_MAX:
            pwm = PWM_MAX
    else:
        # Stop mode
        GPIO.output(PINS["DIR_L"], False)
        pwm = 0

    leftMotorPWM.ChangeDutyCycle(pwm)    

# Motor update
def updateMotors():
    
    drive = DIR["UP"] - DIR["DOWN"]
    turn = DIR["RIGHT"] - DIR["LEFT"]

    left = drive + turn
    right = drive - turn

    maximum = max(abs(left), abs(right))
    if maximum > 1:
        left /= maximum
        right /= maximum
    
    setMotorLeft(left)
    setMotorRight(right)

# Set the direction
@app.route("/setDirection", methods=["POST"])
def setDirection():
    direction = request.form["DIR"]
    DIR[direction] = 1
    updateMotors()
    return ""

# Set the direction to 0
@app.route("/setDirectionZero", methods=["POST"])
def setDirectionZero():
    direction = request.form["DIR"]
    DIR[direction] = 0
    updateMotors()
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