from tempfile import TemporaryFile
from typing import Set
from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from forex_python.converter import CurrencyRates, CurrencyCodes

app = Flask(__name__)
app.config['SECRET_KEY']  = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
dubug = DebugToolbarExtension(app)

@app.route('/')
def home():
    return render_template("base.html")
@app.route('/convert', methods=["GET"])
def convert():
    fromCurrency = request.args.get("from")
    toCurrency = request.args.get("to")
    ammount = int(request.args.get("ammt"))
    result = convertCurrency(fromCurrency,toCurrency, ammount)
    returnString = f'{result["code"]}{result["convertedAmmount"]}'
    return render_template("base.html", msgs=result["messages"], returnString = returnString)

def convertCurrency(fromCurrency,toCurrency,ammount):
    result = {}
    result["messages"] = set()
    c = CurrencyRates()
    try:
        c.get_rates(fromCurrency)
    except:
        result["messages"].add(f'Not a Valid Code: {fromCurrency}')
    try:
        c.get_rates(toCurrency)
    except:
        result["messages"].add(f'Not a Valid Code: {toCurrency}')
    try:
        result["convertedAmmount"] = "{:.2f}".format(c.convert(fromCurrency,toCurrency,ammount))
    except:
        result["messages"].add(f'Not a ammount: {ammount}')
    c = CurrencyCodes()
    result["code"] = c.get_symbol(toCurrency)
    return result