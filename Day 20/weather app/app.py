from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# 🔑 Replace with your API key
API_KEY = "79cfd4bb2f98fd49378824e1c6928df4"

@app.route("/", methods=["GET", "POST"])
def index():
    weather = None
    if request.method == "POST":
        city = request.form.get("city")
        if city:
            url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
            response = requests.get(url).json()

            if response.get("cod") == 200:  # ✅ valid city
                weather = {
                    "city": response["name"],
                    "temp": response["main"]["temp"],
                    "desc": response["weather"][0]["description"],
                }
            else:
                weather = {"error": "City not found. Try again!"}

    return render_template("index.html", weather=weather)

if __name__ == "__main__":
    app.run(debug=True)