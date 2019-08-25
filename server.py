from flask import Flask, send_from_directory
app = Flask(__name__,static_folder="frontend/static")

@app.route("/")
def hello():
	with open("frontend/dist/index.html","r") as indexPage: 
		return indexPage.read()
	return "Could not load file..."


@app.route('/<path:filename>')
def loadStatic(filename):
	return send_from_directory(app.static_folder,filename)

if __name__ == "__main__":
    app.run(host='0.0.0.0', 
            port=5000)
