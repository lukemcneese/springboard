# Put your app in here.
from flask import Flask, request
import operations

app = Flask(__name__)

@app.route('/<operation>')
def add_route(operation):
    a = int(request.args["a"])
    b = int(request.args["b"])
    if operation == "add":
        return str(operations.add(a,b))
    if operation == "sub":
        return str(operations.sub(a,b))
    if operation == "mult":
        return str(operations.mult(a,b))
    if operation == "div":
        return str(operations.div(a,b))    