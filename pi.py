import RPi.GPIO as GPIO

# GPIO settings
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

PINS = {

    "LIMIT": 17

}
for PIN in PINS:
    GPIO.setup(PINS[PIN], GPIO.OUT)
    if PIN == "LIMIT":
        GPIO.setup(PINS[PIN], GPIO.IN)

def main():

    while True:
        if not GPIO.input(PINS["LIMIT"]):
            print("pressed")