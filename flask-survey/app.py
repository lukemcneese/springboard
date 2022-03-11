from contextlib import redirect_stderr
import surveys
from flask import Flask, request, render_template, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY']  = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

dubug = DebugToolbarExtension(app)
response = []
survey = surveys.surveys.get("satisfaction")

@app.route('/')
def home():
    return render_template("home.html", headertitle=survey.title, pagetitle=survey.title, content =survey.instructions)

@app.route('/questions/<int:question_num>')
def question(question_num):
    if(len(response) == len(survey.questions)):
        return redirect('/finished')
    question = survey.questions[question_num]
    return render_template("questions.html", question_num = question_num, question=question )

@app.route('/answer', methods=["POST"])
def save_answer():
    response.append(request.form["answer"])
    if(len(response) == len(survey.questions)):
        return redirect("finished")
    else:
        return redirect(f"/questions/{len(response)}")

@app.route('/finished')
def finished():
    return render_template("finished.html")