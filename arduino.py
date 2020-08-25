from nanpy import ArduinoApi
from nanpy import SerialManager

# Setup Arduino
ARDUINO = ArduinoApi(SerialManager(device="/dev/ttyACM0"))

# Arduino pins
PINS = {

    "PWM_R": 7,
    "PWM_L": 10,
    "PWM_EXT": 5,
    "DIR_R": 8,
    "DIR_L": 12,
    "DIR_EXT": 3

}
for PIN in PINS:
    ARDUINO.pinMode(PINS[PIN], ARDUINO.OUTPUT)

# 255 is the actual maximum
PWM_MAX = 150

# Directions
robotDir = {

    "up": 0,
    "down": 0,
    "right": 0,
    "left": 0,

}

# Multiplier
multiplier = {

    "multiplier": 1.0

}

# Set motor power
def setMotor(dirPin, pwmPin, power):
    if power < 0: 
        # Reverse mode
        ARDUINO.digitalWrite(dirPin, ARDUINO.LOW)
        pwm = -int(PWM_MAX * power)
        if pwm > PWM_MAX:
            pwm = PWM_MAX
    elif power > 0:
        # Forward mode
        ARDUINO.digitalWrite(dirPin, ARDUINO.HIGH)
        pwm = int(PWM_MAX * power)
        if pwm > PWM_MAX:
            pwm = PWM_MAX
    else:
        # Stop mode
        ARDUINO.digitalWrite(dirPin, ARDUINO.LOW)
        pwm = 0
    
    ARDUINO.analogWrite(pwmPin, pwm)

# Update drive motors
def updateDriveMotors():
    
    drive = robotDir["up"] - robotDir["down"]
    turn = robotDir["right"] - robotDir["left"]

    left = drive + turn
    right = drive - turn

    maximum = max(abs(left), abs(right))
    if maximum > 1:
        left /= maximum
        right /= maximum
    setMotor(PINS["DIR_L"], PINS["PWM_L"], left * multiplier["multiplier"])
    setMotor(PINS["DIR_R"], PINS["PWM_R"], right * multiplier["multiplier"])
