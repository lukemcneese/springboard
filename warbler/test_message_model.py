"""Message model tests."""

# run these tests like:
#
#    python -m unittest test_message_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data
db.drop_all()
db.create_all()

class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        u1 = User.signup("test1", "email1@email.com", "password", None)
        uid1 = 1111
        u1.id = uid1

        u2 = User.signup("test2", "email2@email.com", "password", None)
        uid2 = 2222
        u2.id = uid2

        db.session.commit()

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid2

        self.client = app.test_client()
    def test_message(self):
        m = Message(text="testMessage", user_id=self.uid1)
        db.session.add(m)
        db.session.commit()
        self.assertEqual(self.u1.messages[0].text, "testMessage")
    def test_like(self):
        m = Message(text="testMessage", user_id=self.uid1)
        db.session.add(m)
        self.u2.likes.append(m)
        db.session.commit()
        l = Likes.query.filter(Likes.user_id == self.uid2).all()
        self.assertEqual(len(l),1)
        l = Likes.query.filter(Likes.user_id == self.uid1).all()
        self.assertEqual(len(l),0)