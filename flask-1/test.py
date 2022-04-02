from unittest import TestCase
from app import app, convertCurrency

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):
    
    def test_ConvertCurrency(self):
        result = convertCurrency("USD", "EUR", 100)
        self.assertEqual(float(result["convertedAmmount"]), 90.48)
        result = convertCurrency("USD", "USD", 1)
        self.assertEqual(float(result["convertedAmmount"]), 1.00)
        result = convertCurrency("USD", "USD", -4)
        result = result["messages"].pop()
        self.assertEqual(result,"Not an ammount: -4")
    def test_ConvertCurrency2(self):
        result = convertCurrency("DDD", "EUR", 100)
        result = result["messages"].pop() 
        self.assertEqual(result, "Not a Valid Code: DDD")
        result = convertCurrency("USD", "AAA", 100)
        result = result["messages"].pop() 
        self.assertEqual(result, "Not a Valid Code: AAA") 