"""User model tests."""

# run these tests like:
#
#    python3 -m unittest test_user_model.py


import os
from unittest import TestCase
from models import Experience, User, Activity, Park, db


# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///exploretheparks_test"

# Now we can import app

from app import ACTIVITY_ICONS, CURR_USER_KEY, app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.drop_all()
db.create_all()

app.config['WTF_CSRF_ENABLED'] = False

class ExperienceModelTestCase(TestCase):
    """Test routes for Experiences """
    def setUp(self):
        """Create test client, add sample data."""

        Park.query.delete()
        Activity.query.delete()
        Experience.query.delete()
        User.query.delete()
        
        #add Parks to the DB
        park1 = Park(
            id = "abli",
            name = "Abraham Lincoln Birthplace",
            description = "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country's first memorial to Lincoln, built with donations from young and old, and the site of his childhood home.",
            designation = "National Historical Park"
        )
        park2 = Park(
            id = "acad",
            name = "Acadia",
            description = "Acadia National Park protects the natural beauty of the highest rocky headlands along the Atlantic coastline of the United States, an abundance of habitats, and a rich cultural heritage. At 4 million visits a year, it's one of the top 10 most-visited national parks in the United States. Visitors enjoy 27 miles of historic motor roads, 158 miles of hiking trails, and 45 miles of carriage roads.",
            designation = "National Park"
        )

        db.session.add_all([park1,park2])
        db.session.commit()
        self.park1 = park1
        self.park2 = park2

        #add Activities to the DB
        
        activity1 = Activity(
            id = "A59947B7-3376-49B4-AD02-C0423E08C5F7",
			name = "Camping",
            icon = ACTIVITY_ICONS["Camping"]
        )
        activity2 = Activity(
            id = "13A57703-BB1A-41A2-94B8-53B692EB7238",
			name = "Astronomy",
            icon = ACTIVITY_ICONS["Astronomy"]
        )
        activity3 = Activity(
            id = "7CE6E935-F839-4FEC-A63E-052B1DEF39D2",
			name = "Biking",
            icon = ACTIVITY_ICONS["Biking"]
        ) 
        db.session.add_all([activity1, activity2, activity3])
        db.session.commit()
        self.activity1 = activity1
        self.activity2 = activity2
        self.activity3 = activity3

        #add User to the DB
        u1 = User.signup("test1", "email1@email.com", "password", "test1fullname")
        uid1 = 1111
        u1.id = uid1
        db.session.commit()
        self.u1 = u1
        self.uid1 = uid1
        self.client = app.test_client()


    #def test_user_exerpeinces(self):
    def test_addExperience(self):
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.uid1
            resp = c.get(f"/{self.uid1}/{self.park1.id}/{self.activity1.id}")

            #resp = c.post(f"/{self.uid1}/{self.park1.id}/{self.activity1.id}", data={"date":"2002-02-15"})
            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)
            exp = Experience.query.one()
            self.assertEqual(exp.user_id, self.uid1)
            self.assertEqual(exp.park_id, self.park1.id)
            self.assertEqual(exp.activity_id, self.activity1.id)
            #self.assertEqual(exp.date, "2002-02-15")
