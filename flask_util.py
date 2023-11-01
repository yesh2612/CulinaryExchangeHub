from flask import Flask, jsonify, redirect, render_template, request
import pandas as pd
import psycopg2

import users_db

app = Flask(__name__,template_folder="templates")

users_conn = psycopg2.connect(database = "users",
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
users_cur = users_conn.cursor()
users_op = users_db.DB_Operations(users_cur)
users_values = []
# users_op.create_users_table(users_cur)

@app.route('/')
def index():

    return render_template('registration-page.html')


@app.route('/registration', methods=['POST'])
def registration():
    global users_op, users_cur, users_conn, users_values
    users_conn = psycopg2.connect(database = "users",
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
    users_cur = users_conn.cursor()
    users_op = users_db.DB_Operations(users_cur)
    users_values = []

    data = request.get_json()
    
    user_name = data.get('username')
    user_password = data.get('password')

    print("username:{}\npassword:{}".format(user_name, user_password))
    value = (user_name, user_password)
    users_values.append(value)
    users_op.insert_into_users_table(users_cur, users_values)
    users_conn.commit()
    users_cur.close()
    users_conn.close()
    users_values = []
    return jsonify({'message': 'Login successful'})


    

if __name__ == '__main__': 
    app.run(host='localhost', port=5500)
