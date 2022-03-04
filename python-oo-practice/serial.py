"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self,start):
        self.start = start
        self.serial = start
    def generate(self):
        """returns the current Serial number and increments self.serial"""
        retValue = self.serial
        self.serial+= 1
        return retValue
    def reset(self):
        """rests the serial number to the intialized value"""
        self.serial = self.start
