from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, DateField, HiddenField
from wtforms.validators import DataRequired, Email, Length
#import email_validator


class LoginForm(FlaskForm):
    """Login form."""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class UserAddForm(FlaskForm):
    """Form for adding users."""

    username = StringField('Username', validators=[DataRequired()])
    full_name = StringField('Full Name', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class experienceForm(FlaskForm):
    """Form for adding experiences."""
    user_id = HiddenField('User')
    park_id = HiddenField('Park')
    activity_id = HiddenField('Activity')
    date = DateField('Date', validators=[DataRequired()])
