"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

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

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)
    ### is_following Test
    def test_isfollowing(self):
        """test the is_following functionaility"""
        self.u1.following.append(self.u2)
        db.session.commit()
        self.assertTrue(self.u1.is_following(self.u2))
    def test_is_not_following(self):
        self.assertFalse(self.u1.is_following(self.u2))

    ### is_followed_by Test
    def test_is_followed_by(self):
        self.u2.following.append(self.u1)
        db.session.commit()
        self.assertTrue(self.u1.is_followed_by(self.u2))
    def test_is_not_followed_by(self):
        self.assertFalse(self.u1.is_followed_by(self.u2))

    ### user Model Test
    def test_create(self):
        u_test = User.signup("testUser", "test@useremail.com", "password", None)
        db.session.add(u_test)
        db.session.commit()

        self.assertEqual(u_test.username, "testUser")
        self.assertEqual(u_test.email, "test@useremail.com")
        self.assertNotEqual(u_test.password, "password")
    
    def test_valid_authentication(self):
        u = User.authenticate(self.u1.username, "password")
        self.assertIsNotNone(u)
        self.assertEqual(u.id, self.uid1)
    
    def test_invalid_authentication(self):
        u = User.authenticate("Notausername", "password")
        self.assertFalse(u)
    def test_invalid_authenticationPW(self):
        u = User.authenticate(self.u1.username, "Notapassword")
        self.assertFalse(u)

