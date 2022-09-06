from pydoc import describe
from flask import Flask, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Playlist, Song, PlaylistSong
from forms import NewSongForPlaylistForm, SongForm, PlaylistForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///playlist-app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.drop_all()
db.create_all()
ChristmasSong = Song(title="Christmas Song", artist = "Dave Matthews Band")
FourtyOne = Song(title="41", artist = "Dave Matthews Band")
Crash = Song(title="Crash", artist = "Dave Matthews Band")
Truckin = Song(title="Truckin", artist = "Grateful Dead")
ShakedownStreet = Song(title = "Shakedown Street", artist = "Grateful Dead")
TennesseeJed = Song(title="Tennessee Jed", artist = "Grateful Dead")
GratefulDead = Playlist(name="Grateful Dead Hits", description = "deadheads" )
DMB = Playlist(name = "Dave Matthews Hits", description = "DMBheads")
db.session.add_all([ChristmasSong,FourtyOne, Crash, Truckin,ShakedownStreet,TennesseeJed, GratefulDead, DMB])
db.session.commit()

 
app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route("/")
def root():
    """Homepage: redirect to /playlists."""

    return redirect("/playlists")


##############################################################################
# Playlist routes


@app.route("/playlists")
def show_all_playlists():
    """Return a list of playlists."""

    playlists = Playlist.query.all()
    return render_template("playlists.html", playlists=playlists)


@app.route("/playlists/<int:playlist_id>")
def show_playlist(playlist_id):
    """Show detail on specific playlist."""
    playlist = Playlist.query.get_or_404(playlist_id)
    print([s for s in playlist.songs])
    curr_on_playlist = [s for s in playlist.songs]
    #print(curr_on_playlist)
    return render_template("playlist.html",playlist=playlist, curr_on_playlist=curr_on_playlist)


@app.route("/playlists/add", methods=["GET", "POST"])
def add_playlist():
    """Handle add-playlist form:
    
    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-playlists
    """
    form = PlaylistForm()
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        newPlaylist = Playlist(name=name,description=description)
        db.session.add(newPlaylist)
        db.session.commit()
        return redirect("/playlists")
    else:
        return render_template("new_playlist.html",form=form)


##############################################################################
# Song routes


@app.route("/songs")
def show_all_songs():
    """Show list of songs."""

    songs = Song.query.all()
    return render_template("songs.html", songs=songs)


@app.route("/songs/<int:song_id>")
def show_song(song_id):
    """return a specific song"""
    song = Song.query.get_or_404(song_id)
    return render_template("song.html",song=song)


@app.route("/songs/add", methods=["GET", "POST"])
def add_song():
    """Handle add-song form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-songs
    """
    form = SongForm()
    if form.validate_on_submit():
        title = form.title.data
        artist = form.artist.data
        newSong = Song(title=title,artist=artist)
        db.session.add(newSong)
        db.session.commit()
        return redirect("/songs")
    else:
        return render_template("new_song.html",form=form)
    # ADD THE NECESSARY CODE HERE FOR THIS ROUTE TO WORK


@app.route("/playlists/<int:playlist_id>/add-song", methods=["GET", "POST"])
def add_song_to_playlist(playlist_id):
    """Add a playlist and redirect to list."""
    playlist = Playlist.query.get_or_404(playlist_id)
    form = NewSongForPlaylistForm()

    # Restrict form to songs not already on this playlist
    #curr_on_playlist = [s.id for s in playlist.songs]
    #print("***********************************")
    #print(db.session.query(Song.id,Song.title).all())
    #print("************************")
    #form.song.choices = db.session.query(Song.id,Song.title).all()
    form.song.choices = [(1, 'Christmas Song'), (2, '41'), (3, 'Crash'), (4, 'Truckin'), (5, 'Shakedown Street'), (6, 'Tennessee Jed')]
    #.filter(Song.id.notin_(curr_on_playlist)

    if form.validate_on_submit():
        playlist_song = PlaylistSong(song_id=form.song.data, playlist_id=playlist_id)
        db.session.add(playlist_song)
        db.session.commit()
        return redirect(f"/playlists/{playlist_id}")
    return render_template("add_song_to_playlist.html", playlist=playlist, form=form)
