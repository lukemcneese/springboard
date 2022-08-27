from models import User, db, Post
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()
Post.query.delete()

# Add users
alanAlda = User(first_name='Alan', last_name='Alda')
joelBurton = User(first_name='Bowser', last_name="Burton")
janeSmith = User(first_name='Spike', last_name="Smith")

#add Post
alanAlda.

#add Tags to the Post 

# Add new objects to session, so they'll persist
db.session.add(alanAlda)
db.session.add(joelBurton)
db.session.add(janeSmith)

# Commit--otherwise, this never gets saved!
db.session.commit()