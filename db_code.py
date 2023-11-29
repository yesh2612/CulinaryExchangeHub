from flask import Flask
from psycopg2 import connect
import psycopg2

class DB_Operations:
    def __init__(self, cur):
        self.cur = cur


    def create_recipe_table(self, cur, table_name):
        self.cur = cur
        self.cur.execute(f"""CREATE TABLE recipes(recipe_ID SERIAL PRIMARY KEY, recipe_Name VARCHAR(50) UNIQUE NOT NULL, user_id INTEGER REFERENCES {table_name}(User_ID) NOT NULL);""")
    
    def insert_into_recipe_table(self, cur, values):
        self.cur = cur

        insert_query = """INSERT INTO recipes(recipe_Name, user_id) VALUES (%s, %s) RETURNING recipe_id;"""
        insert_records = (values[0], values[1])
        self.cur.execute(insert_query, insert_records)
        return self.cur.fetchone()[0]

    def get_no_of_rows(self, cur, table_name):
        self.cur = cur
        self.cur.execute(f"SELECT COUNT(*) FROM {table_name}")
        row_count = self.cur.fetchone()[0]
        return row_count
    def display_recipe_table(self, cur):
        self.cur = cur
        self.cur.execute("SELECT * FROM recipes")
        return self.cur.fetchall()
