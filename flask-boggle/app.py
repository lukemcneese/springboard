from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY']  = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
dubug = DebugToolbarExtension(app)

@app.route('/')
def home():
    session['board'] = boggle_game.make_board()
    print("We are in the Home Route")
    return render_template("base.html", board = session['board'])

    
@app.route('/validate_word', methods = ["POST"])
def validate_word():
    print("We are in the Python Validate Word",request)
    guess = request.form.get("word")
    response = {"result": boggle_game.check_valid_word(session['board'],guess)}
    return jsonify(response)