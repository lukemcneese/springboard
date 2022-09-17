import os

from flask import Flask, render_template, request, flash, redirect, session, g, abort
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError
import requests

from forms import UserAddForm, LoginForm
from models import db, connect_db, User, Park, Activity, Experience, Activity_Park

CURR_USER_KEY = "curr_user"
BASE_URL = "http://developer.nps.gov/api/v1"
API_KEY = {"api_key" : "KqtI2kz7N14mSqabraT7AotPC2uSbMgRXCKCuo9j"}

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgresql:///exploretheparks'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")


connect_db(app)
db.drop_all()
db.create_all()
####
#load Test data into the database
response = (requests.get(f"{BASE_URL}/parks",params=API_KEY)).json()
parksdata = response["data"]
databaseseed = []
for p in parksdata:
    newPark = Park(
        id = p["parkCode"],
        name = p["name"],
        designation = p["designation"],
        description = p["description"],
        image_url = p["images"][0]["url"],
        image2_url = p["images"][1]["url"] if len(p["images"]) > 1 else p["images"][0]["url"]
    )
    databaseseed.append(newPark)
db.session.add_all(databaseseed)
db.session.commit()
print(f' ** {response["limit"]} Parks Loaded *')


####
@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""
    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
    else:
        g.user = None


def do_login(user):
    """Log in user."""
    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""
    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
                image_url=form.image_url.data or User.image_url.default.arg,
            )
            db.session.commit()
        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('users/signup.html', form=form)
        do_login(user)
        return redirect("/")

    else:
        return render_template('users/signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""
    form = LoginForm()
    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)
        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")
            return redirect("/")
        flash("Invalid credentials.", 'danger')
    return render_template('users/login.html', form=form)


@app.route('/logout')
def logout():
    """Handle logout of user."""
    do_logout()
    flash("Logged Out", 'success')
    return redirect("/")

@app.route('/')
def homepage():
    parks = (Park.query.all())
    return render_template('/parks/index.html', parks=parks)

@app.route('/parks/<park_id>')
def park_detail(park_id):
    park = Park.query.get_or_404(park_id)
    activities = load_park_activities(park_id)
    return render_template('/parks/detail.html', park=park, activities=activities)

def load_park_activities(park_id):
    params = {
        "parkCode" : park_id
    }
    params.update(API_KEY)
    response = ((requests.get(f"{BASE_URL}/parks",params=params)).json())["data"][0]
    activities = response["activities"]
    return activities