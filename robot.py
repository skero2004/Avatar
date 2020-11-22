import serial
class Robot:

    def __init__(self):

        # Set up serial communication
        self.ser = serial.Serial("/dev/ttyACM0", 74880)

    def stop(self):
        self.ser.write(b"a\n")
    
    def forward(self):
        self.ser.write(b"b\n")

    def backward(self):
        self.ser.write(b"c\n")

    def turnRight(self):
        self.ser.write(b"d\n")

    def turnLeft(self):
        self.ser.write(b"e\n")

    def setSlow(self):
        self.ser.write(b"f\n")

    def setNormal(self):
        self.ser.write(b"g\n")

    def extendUp(self):
        self.ser.write(b"h\n")

    def retractDown(self):
        self.ser.write(b"i\n")

    def stopExtender(self):
        self.ser.write(b"j\n")

    def setDisplay(self, text):
        self.ser.write(bytes("k{}\n".format(text), 'utf-8'))