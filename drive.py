class Drive:

    def __init__(self, settings):

        # Setup
        self.ARDUINO = settings.ARDUINO
        self.PINS = settings.ARDUINO_PINS
        self.PWM_MAX = settings.PWM_MAX

        # Directions
        self.robotDir = {

            "up": 0,
            "down": 0,
            "right": 0,
            "left": 0

        }

        # Multiplier
        self.multiplier = 1.0
    
    # Set motor power
    def setMotor(self, dirPin, pwmPin, power):
        if power < 0: 
            # Reverse mode
            self.ARDUINO.digitalWrite(dirPin, self.ARDUINO.LOW)
            pwm = -int(self.PWM_MAX * power)
            if pwm > self.PWM_MAX:
                pwm = self.PWM_MAX
        elif power > 0:
            # Forward mode
            self.ARDUINO.digitalWrite(dirPin, self.ARDUINO.HIGH)
            pwm = int(self.PWM_MAX * power)
            if pwm > self.PWM_MAX:
                pwm = self.PWM_MAX
        else:
            # Stop mode
            self.ARDUINO.digitalWrite(dirPin, self.ARDUINO.LOW)
            pwm = 0
        
        self.ARDUINO.analogWrite(pwmPin, pwm)

    # Update drive motors
    def updateDriveMotors(self):

        drive = self.robotDir["up"] - self.robotDir["down"]
        turn = self.robotDir["right"] - self.robotDir["left"]

        left = drive + turn
        right = drive - turn

        maximum = max(abs(left), abs(right))
        if maximum > 1:
            left /= maximum
            right /= maximum

        # Set left motor
        self.setMotor(self.PINS["DIR_L"], self.PINS["PWM_L"], 0.5 * left * self.multiplier)

        # Set right motor
        self.setMotor(self.PINS["DIR_R"], self.PINS["PWM_R"], 0.5 * right * self.multiplier)

    # Move robot according to direction
    def moveRobot(self, dir):
        self.robotDir[dir] = 1
        self.updateDriveMotors()

    # Stop the robot
    def stopRobot(self):
        self.robotDir["up"] = 0
        self.robotDir["left"] = 0
        self.robotDir["down"] = 0
        self.robotDir["right"] = 0
        self.updateDriveMotors()

    # Set the speed of the robot
    def setMultiplier(self, multiplier):
        self.multiplier = float(multiplier)
        self.updateDriveMotors()