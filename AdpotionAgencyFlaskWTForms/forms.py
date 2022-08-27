from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Optional

class petForm(FlaskForm):
    name = StringField("Pet's Name", validators=[InputRequired(message="Name cannot be blank")])
    species = StringField("Pet's Species", validators=[InputRequired(message="Species cannot be blank")])
    photo_url = StringField("URL of Photo")
    age = IntegerField("Age of Pet")
    notes = StringField("Any Notes you would like to share about the Pet")

class editPetForm(FlaskForm):
    photo_url = StringField("URL of Photo")
    notes = StringField("Any Notes you would like to share about the Pet")
    available = BooleanField("Available?")
