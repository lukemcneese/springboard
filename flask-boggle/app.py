from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
app = Flask(__name__)
app.config['SECRET_KEY']  = "secret_can_You_keep_a_secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
dubug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def home():
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)
    return render_template("base.html", board = board, highscore=highscore, nplays=nplays)

    
@app.route('/validate_word', methods = ["GET"])
def validate_word():
    guess = request.args["word"]
    response = boggle_game.check_valid_word(session['board'],guess)
    return jsonify({"result": response})

@app.route("/post-score", methods=["POST"])
def post_score():
    """Receive score, update nplays, update high score if appropriate."""

    score = request.json["score"]
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)

    session['nplays'] = nplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)