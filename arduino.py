class Arduino:

    def digitalWrite(self, pin, value):
        self.ser.write(bytes("d,{},{}\n".format(pin, value), encoding='utf8'))

    def analogWrite(self, pin, value):
        self.ser.write(bytes("a,{},{}\n".format(pin, value), encoding='utf8'))

    def pinMode(self, pin, mode):
        self.ser.write(bytes("p,{},{}\n".format(pin, mode), encoding='utf8'))

    def setDisplay(self):
        self.ser.write(bytes("s\n", encoding='utf8'))