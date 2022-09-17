from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):
    """User in the system."""

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    email = db.Column( db.Text, nullable=False, unique=True)
    username = db.Column(db.Text, nullable=False, unique=True,)
    full_name = db.Column(db.Text, nullable = False)
    
    def __repr__(self):
        return f"<User #{self.id}: {self.username}, {self.email}>"
    
    @classmethod
    def signup(cls, username, email, password):
        """Sign up user.Hashes password and adds user to system."""
        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')
        user = User(
            username=username,
            email=email,
            password=hashed_pwd,
        )
        db.session.add(user)
        return user
    @classmethod
    def authenticate(cls, username, password):
        """Find user with `username` and `password`.
        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.
        If can't find matching user (or if password is wrong), returns False.
        """
        user = cls.query.filter_by(username=username).first()
        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user
        return False
class Activity(db.Model):
    """Activity Model"""
    __tablename__ = "activities"
    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    logo_url = db.Column(db.Text)

class Park(db.Model):
    """Parks Model"""
    __tablename__ = "parks"
    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable = False)
    description = db.Column(db.Text, nullable = False)
    designation = db.Column(db.Text, nullable = False)
    image_url = db.Column(db.Text)
    image2_url = db.Column(db.Text)

class Experience(db.Model):
    """Table that logs an experience, so a specific user visiting a specific park and doing a specific activity"""
    __tablename__ = "experiences"
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id', ondelete= 'CASCADE'))
    activity_id = db.Column(db.Text,db.ForeignKey('activities.id', ondelete= 'CASCADE'))
    park_id = db.Column(db.Text,db.ForeignKey('parks.id', ondelete= 'CASCADE'))
    date = db.Column(db.Date)

    user = db.relationship('User')
    activity = db.relationship('Activity')
    park = db.relationship('Park')

class Activity_Park(db.Model):
    """Connect of a what activities a park has"""
    ___tablename__ = "activities_parks"
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    activity_id = db.Column(db.Text,db.ForeignKey('activities.id', ondelete= 'CASCADE'))
    park_id = db.Column(db.Text,db.ForeignKey('parks.id', ondelete= 'CASCADE'))


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)