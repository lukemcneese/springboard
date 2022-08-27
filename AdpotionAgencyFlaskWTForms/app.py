from flask import Flask, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import petForm, editPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "micahman2017"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
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

@app.route('/')
def home_page():
    """Render home page"""
    pets = Pet.query.all()
    return render_template("index.html", pets = pets)

@app.route('/add', methods=["GET","POST"])
def app_pet():
    """Render add pet page"""
    form = petForm()
    if form.validate_on_submit():
        name =  form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        new_pet = Pet(name=name,species=species,photo_url=photo_url,age=age,notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        flash(f"Added {name} who is {species}")
        return redirect('/')
    else:
        return render_template("pet_add_form.html",form=form)

@app.route("/pets/<int:pet_id>", methods = ["GET", "POST"])
def edit_pet(pet_id):
    """Edit pet"""
    pet = Pet.query.get_or_404(pet_id)
    form = editPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        return redirect('/')
    else:
        return render_template("pet_edit_form.html", form=form, pet=pet)
