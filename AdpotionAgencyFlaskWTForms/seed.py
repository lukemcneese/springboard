"""Seed file to make sample data for db."""

from models import Pet
from app import db

# Create all tables
db.drop_all()
db.create_all()

Pet.query.delete()

todd = Pet(name="Todd", species = "Mutt", photo_url="https://media.kidadl.com/Black_Lab_Lifespan_650ca39bb3.jpg", age = 10, available = False)
spark = Pet(name="Spark", species = "Lab", photo_url="https://thehappypuppysite.com/wp-content/uploads/2018/08/black-labrador-long.jpg", age = 12, available = True)
powderpuff = Pet(name="Powderpuff", species = "cat", photo_url="https://t2.ea.ltmcdn.com/en/posts/1/7/1/20_white_cat_breeds_full_list_3171_orig.jpg", age = 3, available = True)
 
db.session.add(todd)
db.session.add(spark) 
db.session.add(powderpuff)
db.session.commit()
