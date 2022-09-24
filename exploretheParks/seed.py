from app import db, API_KEY, BASE_URL, ACTIVITY_ICONS
import requests
from models import Park, Activity

db.drop_all()
db.create_all()

##need to not drop and create user and experiences table
####
#load Test data into the database
response = (requests.get(f"{BASE_URL}/parks",params=API_KEY)).json()
parksdata = response["data"]
databaseseed = []
for p in parksdata:
    newPark = Park(
        id = p["parkCode"],
        name = p["name"],
        designation = p["designation"],
        description = p["description"],
        image_url = p["images"][0]["url"],
        image2_url = p["images"][1]["url"] if len(p["images"]) > 1 else p["images"][0]["url"]
    )
    databaseseed.append(newPark)

db.session.add_all(databaseseed)
db.session.commit()
print(f' ** {response["limit"]} Parks Loaded *')
####

####
#load activities and icons into the database
activityResponse = (requests.get(f"{BASE_URL}/activities",params=API_KEY)).json()
activitydata = activityResponse["data"]
activityDB = []
for a in activitydata:
    newActivity = Activity(
        id = a["id"],
        name = a["name"],
        icon = ACTIVITY_ICONS[a["name"]]
    )
    activityDB.append(newActivity)
db.session.add_all(activityDB)
db.session.commit()
print(" ** Activities & Icons Loaded *")
####