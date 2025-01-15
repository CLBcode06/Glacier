#Importing Libaries Here
from flask import Flask, redirect, request, render_template

#CONSTANTS
APP = Flask(__name__)

#Page Rendering
@APP.route('/')
def index():
    return render_template('index.html')

@APP.route('/login')
def login():
    return render_template('login.html')

#Server runs from here
if __name__ == "__main__":
    APP.run(debug=True)