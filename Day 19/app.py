from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(_name_)
app.secret_key = "change_this_to_a_secret"

users = {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/features")
def features():
    return render_template("features.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        if email in users:
            return render_template("signup.html", error="Email already exists")
        users[email] = {"name": name, "password": generate_password_hash(password)}
        session["user"] = email
        return redirect(url_for("dashboard"))
    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = users.get(email)
        if not user:
            return render_template("login.html", error="Invalid credentials")
        if not check_password_hash(user["password"], password):
            return render_template("login.html", error="Invalid credentials")
        session["user"] = email
        return redirect(url_for("dashboard"))
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    user_email = session.get("user")
    if not user_email:
        return redirect(url_for("login"))
    user = users.get(user_email)
    return render_template("dashboard.html", user=user)

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("index"))

if _name_ == "_main_":
    app.run(debug=True)
