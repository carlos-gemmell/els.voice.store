from flask import Flask, send_from_directory, jsonify, request
import json
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

from utils.get_url import generate_signed_url
from utils.send_file import upload_blob
from utils.list_objects import list_blobs_with_prefix
import os
from datetime import datetime

app = Flask(__name__)

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
    print("got login request")
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
	with open("frontend/index.html","r") as indexPage: 
		return indexPage.read()
	return "Could not load file..."


@app.route('/main.js')
def loadStatic():
	return send_from_directory("frontend/","main.js")

@app.route("/upload",methods=['POST'])
@jwt_required
def uploadFile():
    print("files",request.files.get("data"))
    name = get_jwt_identity() + "_" + datetime.now().strftime("%d-%m-%Y_%H-%M-%S") + ".txt"

    dirName = 'temp'
    print(name)
    
    try:
        # Create target Directory
        os.mkdir(dirName)
        print("Directory " , dirName ,  " Created ") 
    except FileExistsError:
        print("Directory " , dirName ,  " already exists")


    with open("temp/"+name, 'wb+') as destination:
        destination.write(request.files.get('data').read())
    upload_blob("els_voice_store_audio", "temp/"+name, name)
    os.remove("temp/"+name)
    return "HEYO YOU UPLOADED DA FILE!"

@app.route("/list_from_user", methods=["POST"])
@jwt_required
def list_files():
    username = get_jwt_identity()
    names = list_blobs_with_prefix("els_voice_store_audio", username)
    print("user {} requested audio names".format(username))
    print(names)
    return jsonify(file_names=names)

@app.route('/get_audio', methods=['POST'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    
    current_user = get_jwt_identity()
    print(current_user)
    file_name = request.json.get('file_name', None)
    if not file_name:
        return jsonify({"msg": "Missing file_name parameter"}), 400
    return jsonify(download_url=generate_signed_url("els_voice_store_audio", file_name, 60)), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', 
            port=5000)
