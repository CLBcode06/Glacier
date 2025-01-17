#Importing Libaries Here
from flask import Flask, redirect, request, render_template, jsonify
import hashlib
import sqlite3

#CONSTANTS
APP = Flask(__name__)

#-------------------------------------------------Page Rendering-------------------------------------------------
@APP.route('/')
def index():
    return render_template('index.html')

@APP.route('/home')
def home():
    return render_template('home.html')

#---------------------------------------------Server-Side Functions----------------------------------------------

#Account Creation Function
@APP.route('/new-account', methods=['POST'])
def new_account():
    data = request.json  #Parse incoming JSON
    if not data:
        return jsonify({'message': 'Invalid request data'}), 400

    #Extract data
    name = data.get('name')
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    #Encrypt Data
    name = encrypt_data(name)
    username = encrypt_data(username)
    password = encrypt_data(password)
    email = encrypt_data(email)
    
    #Save data into Database
    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO accounts_tbl (name, username, password, email) VALUES (?, ?, ?, ?)', (name, username, password, email))
            conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400

    return jsonify({'message': 'Account created successfully!'}), 200

#Hash and Salting Function
def encrypt_data(data: str, salt: str = "static_salt") -> str:
    #Combine the salt and data
    combined = salt + data
    
    #Create a SHA-256 hash object
    hash_obj = hashlib.sha256()
    
    #Update the hash object with the combined data (encode to bytes)
    hash_obj.update(combined.encode('utf-8'))
    
    #Return the hexadecimal digest
    return hash_obj.hexdigest()

#Server runs from here
if __name__ == "__main__":
    APP.run(debug=True)