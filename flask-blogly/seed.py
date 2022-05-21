from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add pets
alanAlda = User(first_name='Alan', last_name='Alda')
joelBurton = User(first_name='Bowser', last_name="Burton")
janeSmith = User(first_name='Spike', last_name="Smith")

# Add new objects to session, so they'll persist
db.session.add(alanAlda)
db.session.add(joelBurton)
db.session.add(janeSmith)

# Commit--otherwise, this never gets saved!
db.session.commit()