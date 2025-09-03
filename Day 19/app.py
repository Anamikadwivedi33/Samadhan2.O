from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(_name_)
app.secret_key = "supersecretkey"

DB_NAME = "database.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    # Users table
    c.execute("""CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    password TEXT
                )""")

    # Posts table
    c.execute("""CREATE TABLE IF NOT EXISTS posts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    content TEXT,
                    image_url TEXT,
                    likes INTEGER DEFAULT 0,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                )""")

    # Comments table
    c.execute("""CREATE TABLE IF NOT EXISTS comments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    post_id INTEGER,
                    user_id INTEGER,
                    comment TEXT,
                    FOREIGN KEY(post_id) REFERENCES posts(id),
                    FOREIGN KEY(user_id) REFERENCES users(id)
                )""")
    conn.commit()
    conn.close()

init_db()

# Home Page
@app.route('/')
def index():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("""SELECT posts.id, posts.content, posts.image_url, posts.likes, users.username
                 FROM posts JOIN users ON posts.user_id = users.id
                 ORDER BY posts.id DESC""")
    posts = c.fetchall()
    conn.close()
    return render_template("index.html", posts=posts)

# Signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        try:
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
            conn.commit()
        except:
            return "Username already exists!"
        conn.close()
        return redirect(url_for('login'))
    return render_template("signup.html")

# Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        user = c.fetchone()
        conn.close()
        if user:
            session['user_id'] = user[0]
            session['username'] = user[1]
            return redirect(url_for('index'))
        else:
            return "Invalid credentials!"
    return render_template("login.html")

# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

# Create Post
@app.route('/create_post', methods=['GET', 'POST'])
def create_post():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        content = request.form['content']
        image_url = request.form['image_url']
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)",
                  (session['user_id'], content, image_url))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))
    
    return render_template("create_post.html")

# Like Post
@app.route('/like/<int:post_id>')
def like(post_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("UPDATE posts SET likes = likes + 1 WHERE id=?", (post_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

# View Post + Comments
@app.route('/post/<int:post_id>', methods=['GET', 'POST'])
def view_post(post_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()

    # Fetch post
    c.execute("""SELECT posts.id, posts.content, posts.image_url, posts.likes, users.username 
                 FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id=?""", (post_id,))
    post = c.fetchone()

    # Handle new comment
    if request.method == 'POST':
        if 'user_id' not in session:
            return redirect(url_for('login'))
        comment = request.form['comment']
        c.execute("INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)",
                  (post_id, session['user_id'], comment))
        conn.commit()

    # Fetch comments
    c.execute("""SELECT comments.comment, users.username 
                 FROM comments JOIN users ON comments.user_id = users.id 
                 WHERE comments.post_id=? ORDER BY comments.id DESC""", (post_id,))
    comments = c.fetchall()

    conn.close()
    return render_template("view_post.html", post=post, comments=comments)

if _name_ == "_main_":
    app.run(debug=True)
