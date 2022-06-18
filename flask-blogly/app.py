"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def root():
    return redirect("/users")

@app.route("/users")
def list_users():
    """List uesrs and show add button."""
    users = User.query.all()
    return render_template("list.html", users=users)

@app.route("/users/new", methods=['POST'])
def add_user_redirect():
    """adds a user and redirects to the root route"""
    fname = request.form['fname']
    lname = request.form['lname']
    url = request.form['url']
    newUser = User(first_name=fname, last_name=lname, image_url=url or None)
    db.session.add(newUser)
    db.session.commit()
    return redirect("/users")
    #return redirect(f"/{newUser.id}")

@app.route("/users/new", methods=["GET"])
def users_new():
    """add a user """
    return render_template("addUser.html")
@app.route("/users/<int:user_id>")
def show_user(user_id):
    """Show info on a single user."""
    user = User.query.get_or_404(user_id)
    return render_template("detail.html", user=user)
@app.route("/users/<int:user_id>/edit")
def edit_user(user_id):
    """Edits details on a user"""
    user = User.query.get_or_404(user_id)
    return render_template("editUser.html", user=user)
    
@app.route("/users/<int:user_id>/edit", methods=["POST"])
def edit_user_submit(user_id):
    """Handles the submission of edit of details on a user"""
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['fname']
    user.last_name = request.form['lname']
    user.image_url = request.form['url']

    db.session.add(user)
    db.session.commit()

    return redirect("/users")
    
@app.route("/users/<int:user_id>/delete", methods=["POST"])
def delete_user(user_id):
    """Edits details on a user"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/users")

@app.route("/users/<int:user_id>/posts/new", methods=["GET"])
def add_post_page(user_id):
    """Show form to add a post for that user"""
    user = User.query.get_or_404(user_id)
    return render_template("addPost.html", user=user)

@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def add_post(user_id):
    """Handle add form; add post and redirect to the user detail page."""
    title = request.form['title']
    content = request.form['content']

    newPost = Post(title=title, content=content,user_id = user_id)
    db.session.add(newPost)
    db.session.commit()
    return redirect(f"/users/{user_id}")

@app.route("/posts/<int:post_id>", methods = ["GET"])
def display_post(post_id):
    """Show a post. Show Button to edit and delte the Post"""
    post = Post.query.get_or_404(post_id)
    return render_template('displayPost.html',post=post)
@app.route("/posts/<int:post_id>/edit", methods = ["GET"])
def edit_post_page(post_id):
    """Show form to edit a post, and to cancel (back to user page)."""
    post = Post.query.get_or_404(post_id)
    return render_template('editPost.html',post=post)

@app.route("/posts/<int:post_id>/edit", methods = ["POST"])
def edit_post(post_id):
    """Handle editing of a post. Redirect back to the post view."""
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.add(post)
    db.session.commit()
    return redirect(f'/posts/{post_id}')

@app.route("/posts/<int:post_id>/delete", methods = ["POST"])
def delete_post(post_id):
    """Delete the post."""
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect(f'/users/{post.user_id}')

