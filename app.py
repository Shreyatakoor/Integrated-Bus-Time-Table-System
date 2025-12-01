from flask import Flask, render_template, jsonify
import json, os

app = Flask(_name_, static_folder="static", template_folder="templates")
DATA_PATH = os.path.join(app.root_path, "data", "timetable.json")

def load_data():
    with open(DATA_PATH, "r") as f:
        return json.load(f)

@app.route("/")
def home():
    data = load_data()
    routes = sorted(list(data.keys()))
    return render_template("index.html", routes=routes)

@app.route("/api/route/<path:route_name>")
def api_route(route_name):
    data = load_data()
    # Accept hyphenated route names in URLs (Route-1 -> "Route 1")
    normalized = route_name.replace("-", " ")
    if route_name in data:
        return jsonify({route_name: data[route_name]})
    if normalized in data:
        return jsonify({normalized: data[normalized]})
    return jsonify({"error": "Route not found"}), 404

if _name_ == "_main_":
    app.run(debug=True)
