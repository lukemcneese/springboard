"""Forms for playlist app."""

#from turtle import title
from wtforms import SelectField, StringField
from wtforms.validators import InputRequired, Length
from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""
    name = StringField("Name", validators=[InputRequired(message="Playlist Name required"),Length(max=50,message="Max length of name is 50 characters ")])
    description = StringField("Description", validators=[InputRequired(message="Playlist Description required"),Length(max=50,message="Max length of description is 50 characters ")])


class SongForm(FlaskForm):
    """Form for adding songs."""
    title = StringField("Title", validators=[InputRequired(message="Playlist Title required"),Length(max=50,message="Max length of title is 50 characters ")])
    artist = StringField("Artist", validators=[InputRequired(message="Playlist Artist required"),Length(max=50,message="Max length of artist is 50 characters ")])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""
    song = SelectField('Song To Add', coerce=int)
