from flask import Flask, render_template, redirect, session, flash
from models import db, connect_db, User, Feedback
from forms import userForm, loginForm, feedbackForm
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///flask-feedback-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['SECRET_KEY'] = "oh-so-secret"
connect_db(app)
toolbar = DebugToolbarExtension(app)

@app.route('/')
def root_route():
    """Root route that redirects to register"""
    return redirect("/register")

@app.route('/register', methods = ["GET","POST"])
def register():
    """Route that display the user form and registers the user"""
    form = userForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        newUser = User.register(username,password)
        newUser.email = form.email.data
        newUser.first_name = form.first_name.data
        newUser.last_name = form.last_name.data
        db.session.add(newUser)
        db.session.commit()
        session["username"] = newUser.username
        return redirect(f"/users/{username}")
    else:
        return render_template("register.html",form=form,pagetitle="Register")
@app.route('/login', methods= ["GET", "POST"])
def login():
    """Route that logs the user in so they can see the Secret page"""
    form = loginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username,password)
        if user:
            session["username"] = user.username
            return redirect(f"/users/{username}")
        else:
            form.username.errors = ["Username/Password invalid"]
    return render_template("login.html", form=form, pagetitle="login")
@app.route('/logout')
def logout():
    """Log the user out - clear the session"""
    session.pop("username")
    return redirect("/login")


@app.route('/users/<username>')
def userPage(username):
    """secret page that requires a user to be logged in to display"""
    if "username" not in session:
        flash("You must be logged in to learn the secret")
        return redirect("/login")
    user = User.query.get_or_404(username)
    email = user.email
    first_name=user.first_name
    last_name=user.last_name
    feedbacks = Feedback.query.filter_by(username=user.username).all()
    return render_template("user.html",username=username, email=email, first_name=first_name, last_name=last_name,pagetitle=f"{username}'s Page", feedbacks = feedbacks)
@app.route('/users/<username>/feedback/add', methods=["GET","POST"])
def addFeedback(username):
    """authorized page to add feedback"""
    if "username" not in session:
        flash("You must be logged in to provide feedback")
        return redirect("/login")
    user = User.query.get_or_404(username)
    username = user.username
    form = feedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        newFeedback = Feedback(title=title, content=content, username=username)
        db.session.add(newFeedback)
        db.session.commit()
        return redirect(f"/users/{username}")
    else:
        return render_template("feedback_add.html",form=form,pagetitle="Add Feedback", username=username)    

@app.route('/feedback/<int:feedbackid>/update', methods=["GET","POST"])
def updateFeedback(feedbackid):
    """authorized page to add feedback"""
    if "username" not in session:
        flash("You must be logged in to provide feedback")
        return redirect("/login")
    feedback = Feedback.query.get_or_404(feedbackid)
    form = feedbackForm(obj=feedback)
    if form.validate_on_submit():
        username = session["username"]
        print("******************")
        print(f"SessionUsername: {username}")
        print(f"feedbackUsername: {feedback.username}")
        if username == feedback.username:
            feedback.title = form.title.data
            feedback.content = form.content.data
            db.session.commit()
            return redirect(f"/users/{username}")
        else:
            flash("This is not your feedback to edit")
            return redirect("/logout")
    else:
        return render_template("feedback_update.html",form=form,pagetitle="Update Feedback",feedbackid=feedbackid)    
@app.route('/feedback/<int:feedbackid>/delete', methods=["POST"])
def deleteFeedback(feedbackid):
    """authorized route to delete feedback"""
    if "username" not in session:
        flash("You must be logged in to delete feedback")
        return redirect("/login")
    feedback = Feedback.query.get_or_404(feedbackid)
    username = session["username"]
    if username == feedback.username:
        db.session.delete(feedback)
        db.session.commit()
        return redirect(f"/users/{username}")
    else:
        flash("This is not your feedback to edit")
        return redirect("/logout")
@app.route('/users/<username>/delete', methods=["POST"])
def deleteUser(username):
    """authorized route to delete user"""
    if "username" not in session:
        flash("You must be logged in to delete a user")
        return redirect("/login")
    if username == session["username"]:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop("username")
    return redirect("/login")
    
