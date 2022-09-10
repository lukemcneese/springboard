import re
from flask import Flask, render_template, request, jsonify
import requests
import json
from random import randint

app = Flask(__name__)


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")
@app.route("/api/get-lucky-num", methods=["POST"])
def getLuckNum():
    name = request.json["name"]
    email = request.json["email"]
    year = int(request.json["year"])
    color = request.json["color"]
    errors = {}
    if name == "":
        errors.name = "This field is required."
    if email == "":
        errors.email = "This field is required."
    if year < 1900 or year > 2000:
        errors.year = "This field must be between 1900 and 2000 inclusive"
    if color not in ["red", "green", "orange", "blue"]:
        errors.color = "This field must be red, green, orange or blue"
    if len(errors) > 0 :
        return jsonify(errors)
    lucky = randint(0,101)
    response = {'num':
                {
                    'num': lucky,
                    'fact': requests.get(f"http://numbersapi.com/{lucky}/trivia").text
                },
                'year':
                {
                    'year':year,
                    'fact': requests.get(f"http://numbersapi.com/{year}/year").text

                }
            }
    return jsonify(response)
