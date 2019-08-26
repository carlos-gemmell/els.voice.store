from flask import Flask, send_from_directory, jsonify, request
import json
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__,static_folder="frontend/static")

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'the-wrong-trousers'  # this is our secret key
jwt = JWTManager(app)

def validate_user(username, password):
    with open("./whitelist.json", "r") as read_file:
        whitelist = json.load(read_file)

        for user in whitelist:
            if user["username"] == username and user["password"] == password:
                return True
        return False

# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and you can return
# it to the caller however you choose.
@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if validate_user(username, password):
        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    
    return jsonify({"msg": "Bad username or password"}), 401


@app.route("/")
def hello():
	with open("frontend/dist/index.html","r") as indexPage: 
		return indexPage.read()
	return "Could not load file..."


@app.route('/<path:filename>')
def loadStatic(filename):
	return send_from_directory(app.static_folder,filename)


@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', 
            port=5000)
