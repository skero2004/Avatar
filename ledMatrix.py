from nanpy import Lcd

class LEDMatrix:

    def __init__(self, settings):

        # Settings properties
        self.connection = settings.connection

        # LCD setup
        self.lcd = Lcd([52, 50, 48, 46, 44, 42], [16, 2], self.connection)
        self.lcd.clear()
        self.lcd.setCursor(0, 1)
        self.lcd.printString("FRC Team 568")
    
    # Set lcd display
    def setDisplay(self, text):
        self.lcd.clear()
        self.lcd.setCursor(0, 1)
        self.lcd.printString(text)