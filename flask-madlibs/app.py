from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)

@app.route("/")
def home():
    return render_template("home.html", madlibs=story.prompts)

@app.route('/story')
def submit():
    return render_template("story.html",text = story.generate(request.args))

