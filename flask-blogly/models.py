"""Models for Blogly."""
from contextlib import nullcontext
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()
class User(db.Model):
    """User"""
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    image_url = db.Column(db.String(255), nullable = True, default="https://upload.wikimedia.org/wikipedia/commons/d/d4/Missing_photo.svg")
    posts = db.relationship("Post", backref="user")
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
class Post(db.Model):
    """Post"""
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    title = db.Column(db.String(50), nullable = False)
    content = db.Column(db.String(255), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, default = datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    @property
    def friendly_date(self):
        return self.created_at.strftime("%a %b %-d %Y, %-I:%M %p")

class PostTag(db.Model):
     """PostTag"""
     __tablename__ = "posts_tags"
     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key = True)
     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key = True)


class Tag(db.Model):
    """Tag"""
    __tablename__ = "tags"
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    name = db.Column(db.String(50), nullable = False, unique=True)
    posts = db.relationship('Post', secondary="posts_tags", backref="tags")
def connect_db(app):
    db.app = app
    db.init_app(app)