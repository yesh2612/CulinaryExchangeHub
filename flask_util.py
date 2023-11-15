from flask import Flask, json, jsonify, redirect, render_template, request
import pandas as pd
import psycopg2

import db_code
import users_db
import ingredients_code

app = Flask(__name__,template_folder="templates")

users_conn = psycopg2.connect(database = "users",
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
users_cur = users_conn.cursor()
users_op = users_db.DB_Operations(users_cur)
users_values = []

recipes_conn = psycopg2.connect(database = "users", 
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
recipes_cur = recipes_conn.cursor()
recipes_op = db_code.DB_Operations(recipes_cur)
recipes_values = []

ingreditents_conn = psycopg2.connect(database = "users", 
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
ingreditents_cur = ingreditents_conn.cursor()
ingreditents_op = ingredients_code.DB_Operations(ingreditents_cur)
ingreditents_values = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/recipe-page')
def recipe_page():
    return redirect('/recipes-table')

@app.route('/recipes-table')
def recipes_table():
    global recipes_conn, recipes_cur, recipes_op
    recipes_conn = psycopg2.connect(database = "users", 
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
    recipes_cur = recipes_conn.cursor()

    values =["Egg Curry", 9]
    
    recipes_op.insert_into_recipe_table(recipes_cur, values)
    recipes_conn.commit()
    data = recipes_op.display_recipe_table(recipes_cur)
    print("daata", data)
    dataFrame = pd.DataFrame()
    for value in data:
        dataFrame2 = pd.DataFrame(list(value)).T
        dataFrame = pd.concat([dataFrame,dataFrame2])
    print("ddddd", dataFrame)
    dataFrame.to_html("templates/recipes_data.html")
    recipes_conn.commit()
    recipes_cur.close()
    users_cur.close()
    recipes_conn.close()

    return render_template('recipes_data.html')

@app.route('/ingredients-page')
def ingredients_page():
    return redirect("/ingredient-table")

@app.route('/ingredient-table')
def ingredient_table():
    global ingreditents_conn, ingreditents_cur, ingreditents_op
    ingreditents_conn = psycopg2.connect(database = "users", 
                        user = "postgres", 
                        host= 'localhost',
                        password = "1234",
                        port = 5432)
    ingreditents_cur = ingreditents_conn.cursor()

    values =["egg, masala, onions", 12, "Boil the egg. Add the flavours, add onions"]

    ingreditents_op.insert_into_ingrediets_table(ingreditents_cur, values)
    ingreditents_conn.commit()
    data = ingreditents_op.display_ingredient_table(ingreditents_cur)
    print("daata", data)
    dataFrame = pd.DataFrame()
    for value in data:
        dataFrame2 = pd.DataFrame(list(value)).T
        dataFrame = pd.concat([dataFrame,dataFrame2])
    print("ddddd", dataFrame)
    dataFrame.to_html("templates/ingredients_data.html")
    ingreditents_conn.commit()

    return render_template('ingredients_data.html')


def extract_columns(rows):
    extracted_result = [(row[3], row[4], row[1], row[5]) for row in rows]
    return extracted_result


def merge_records_based_on_recipe_id(rows):
    merged_dict = {}
    for row in rows:
        ingredients_id, description, recipe_id, recipe_name, user_name, steps = row

        if recipe_id in merged_dict:
            merged_dict[recipe_id][1] += '\n' + description  # Merge the 'description' column
            merged_dict[recipe_id][5] += '\n' + steps  # Merge the 'steps' column
        else:
            merged_dict[recipe_id] = list(row)

    result_list = [list(value) for value in merged_dict.values()]

    print(result_list)
    return result_list

@app.route('/display-page')
def display_page():
    return render_template("display-page.html")

@app.route('/display', methods=['POST'])
def display_table():
    global ingreditents_conn, ingreditents_cur, ingreditents_op
    rows = ingreditents_op.get_values(ingreditents_cur)
    
    merge_result = merge_records_based_on_recipe_id(rows)
    
    extract_values = extract_columns(merge_result)

    print("data sent from python:", extract_values)
    
    return jsonify(data = extract_values)


@app.route('/registration-page')
def registration_page():
    return render_template("registration-page.html")

@app.route('/registration', methods=['POST'])
def registration():
    global users_op, users_cur, users_conn, users_values
    try:
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
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/login-page')
def login_page():
    return render_template("login-page.html")

@app.route('/login', methods=['POST'])
def user_login():
    global users_op, users_cur, users_conn, users_values
    try:
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
        result = users_op.check_user_exist(users_cur, user_name, user_password)
        if result:
            users_conn.commit()
            users_cur.close()
            users_conn.close()
            users_values = []
            response = {'message': 'Login successful'}
            return jsonify(response)
        else:
            response = {'error': 'Login failed. Invalid username or password.'}

        return jsonify(response)
    except Exception as e:
        print("exception", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__': 
    app.run(host='localhost', port=5500)
