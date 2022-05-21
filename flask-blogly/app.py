"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def root():
    return redirect("/users")

@app.route("/users")
def list_users():
    """List uesrs and show add button."""
    users = User.query.all()
    return render_template("list.html", users=users)

@app.route("users/new", methods=['POST'])
def add_user_redirect():
    """adds a user and redirects to the root route"""
    fname = request.form['fname']
    lname = request.form['lname']
    url = request.form['url']
    newUser = User(first_name=fname, last_name=lname, image_url=url)
    db.session.add(newUser)
    db.session.commit()
    return redirect("/users")
    #return redirect(f"/{newUser.id}")

@app.route("/users/new")
def users_new():
    """add a user """
    return render_template("addUser.html")
@app.route("/users/<int:user_id>")
def show_user(user_id):
    """Show info on a single user."""
    user = User.query.get_or_404(user_id)
    return render_template("detail.html", user=user)
@app.route("/users/<int:user_id>/edit", methods=["POST"])
def edit_user(user_id):
    """Edits details on a user"""
@app.route("/users/<int:user_id>/delete", methods=["POST"])
def edit_user(user_id):
    """Edits details on a user"""


