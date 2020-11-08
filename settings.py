from nanpy import ArduinoApi
from nanpy import SerialManager
import RPi.GPIO as GPIO

class Settings:
    
    def __init__(self):
       
        #-------- Arduino setup --------#

        # Serial connection to Arduino
        self.connection = SerialManager(device="/dev/ttyACM0")
        self.ARDUINO = ArduinoApi(self.connection)

        # Arduino pins
        self.ARDUINO_PINS = {

            "PWM_R": 7,
            "PWM_L": 10,
            "PWM_EXT": 5,
            "DIR_R": 8,
            "DIR_L": 12,
            "DIR_EXT": 3

        }
        for PIN in self.ARDUINO_PINS:
            self.ARDUINO.pinMode(self.ARDUINO_PINS[PIN], self.ARDUINO.OUTPUT)

        # Arduino PWM max (255 is the actual maximum). Determines the speed of the robot.
        self.PWM_MAX = 150



        # -------- Raspberry Pi Setup --------#   

        # GPIO settings
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)

        # Pi pins
        self.PI_PINS = {

            "LIMIT": 17

        }
        for PIN in self.PI_PINS:
            GPIO.setup(self.PI_PINS[PIN], GPIO.OUT)
            if PIN == "LIMIT":
                GPIO.setup(self.PI_PINS[PIN], GPIO.IN)
