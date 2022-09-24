import os

from flask import Flask, render_template, request, flash, redirect, session, g, abort
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError
import requests
from activity_icons import ACTIVITY_ICONS

from forms import UserAddForm, LoginForm, experienceForm
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
##need to finish moving the setup into the seed file


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
                full_name=form.full_name.data,
                email=form.email.data,            )
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
    if not g.user:
        flash("Please login.","danger")
        return redirect("/login")

    park = Park.query.get_or_404(park_id)
    activities = load_park_activities(park_id)
    return render_template('/parks/detail.html', park=park, activities=activities,user=g.user)

def load_park_activities(park_id):
    params = {
        "parkCode" : park_id
    }
    params.update(API_KEY)
    response = ((requests.get(f"{BASE_URL}/parks",params=params)).json())["data"][0]
    activities = response["activities"]
    append_new_park_activities_to_db(activities)
    return activities

def append_new_park_activities_to_db(activities):
    #add any activities not in the db to the Database
    activityDB = []
    for activity in activities:
        if bool(Activity.query.filter_by(id=activity["id"]).first()) == False:
            newActivity = Activity(
                id = activity["id"],
                name = activity["name"],
                icon = ACTIVITY_ICONS["Default"]
            )
            activityDB.append(newActivity)
    if activityDB:
        db.session.add_all(activityDB)
        db.session.commit()


@app.route('/users/<user_id>')
def user_experieces(user_id):
    """Shows the user page that shows the profile of the user as well as their experiences"""
    if not g.user:
        flash("Please login.","danger")
        return redirect("/login")
    user = User.query.get_or_404(user_id)
    experiences = load_user_experiences(user_id)
    print(experiences)
    return render_template('/users/profile.html',user = user, experiences=experiences )

def load_user_experiences(user_id):
    #get an array of experiences that user has
    experiences = (Experience.query.filter(Experience.user_id == user_id).order_by(Experience.park_id).all())
    print(experiences)
    currParkId = 0
    park_Activty_List = []
    currentParkListIndex = -1
    for experience in experiences:
        print(f'**{currParkId} and {experience.park_id} evalulates {currParkId != experience.park_id}**')
        if currParkId != experience.park_id:
            currParkId = experience.park_id
            park = Park.query.get_or_404(currParkId)
            activity = Activity.query.get_or_404(experience.activity_id)
            park_Activty_List.append({
                "park" : park,
                "activities" : [{
                    "activity": activity,
                    "date": experience.date
                }]
            })
            currentParkListIndex +=1#find a better way to add to do the below append
        else:
            print(currentParkListIndex)
            activity = Activity.query.get_or_404(experience.activity_id)
            park_Activty_List[currentParkListIndex]["activities"].append({
                    "activity": activity,
                    "date": experience.date
            })
    #print(park_Activty_List)
    return park_Activty_List
    #[
    #    "park": Park1 object, "activites" : [{activitiy object, date}]
    #    "park": Park2 object, "activites" : [{activitiy object, date}]
    #]

@app.route('/<user_id>/<park_id>/<activity_id>', methods = ["GET", "POST"])
def addExperience(user_id,park_id,activity_id):
    if not g.user:
        flash("Please login.","danger")
        return redirect("/login")
    form = experienceForm(
        user_id = user_id,
        park_id = park_id,
        activity_id = activity_id
    )
    if form.validate_on_submit():
        newExperience = Experience(
            user_id = form.user_id.data,
            activity_id = form.activity_id.data,
            park_id = form.park_id.data,
            date = form.date.data
        )
        db.session.add(newExperience)
        db.session.commit()
        return redirect(f'/users/{user_id}')
    else:
        user = User.query.get_or_404(user_id)
        park = Park.query.get_or_404(park_id)
        activity = Activity.query.get_or_404(activity_id)
        return render_template('/users/addexperience.html',form = form, user=user, park=park, activity=activity)
