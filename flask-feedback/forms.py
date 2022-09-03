from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import InputRequired, Length

class userForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(message="Username required"),Length(max=20,message="Max length of username is 20 characters ")])
    password = PasswordField("Password",validators=[InputRequired(message="Password required")])
    email = EmailField("Email",validators=[InputRequired(message="Email required"),Length(max=50,message="Max length of email is 50 characters ")])
    first_name = StringField("First Name", validators=[InputRequired(message="First Name required"),Length(max=30,message="Max length of name is 30 characters ")])
    last_name = StringField("Last Name", validators=[InputRequired(message="Last Name required"),Length(max=30,message="Max length of name is 30 characters ")])
class loginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(message="Username required")])
    password = PasswordField("Password",validators=[InputRequired(message="Password required")])
class feedbackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(message="Title required"),Length(max=100,message="Max length of title is 100 characters ")])
    content = StringField("Content", validators=[InputRequired(message="conent required")])
