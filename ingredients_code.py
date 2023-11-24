from flask import Flask
from psycopg2 import connect
import psycopg2

class DB_Operations:
    def __init__(self, cur):
        self.cur = cur

    def insert_into_ingrediets_table(self, cur, values):
        self.cur = cur

        insert_query = """INSERT INTO ingredients(description, recipe_id, steps) VALUES (%s, %s, %s);"""
        insert_records = (values[0], values[1], values[2])
        self.cur.execute(insert_query, insert_records)
    
    def get_no_of_rows(self, cur, table_name):
        self.cur = cur
        self.cur.execute(f"SELECT COUNT(*) FROM {table_name}")
        row_count = self.cur.fetchone()[0]
        return row_count
    def display_ingredient_table(self, cur):
        self.cur = cur
        self.cur.execute("SELECT * FROM ingredients")
        return self.cur.fetchall()
    def get_values(self, cur):
        self.cur = cur
        query = """SELECT
            ingredients.ingredients_id,
            ingredients.description,
            ingredients.recipe_id,
            recipes.recipe_name,
            users.user_name,
            ingredients.steps
        FROM 
            ingredients
        JOIN 
            recipes ON ingredients.recipe_id = recipes.recipe_id
        JOIN
            users ON recipes.user_id = users.user_id"""
        self.cur.execute(query)
        return self.cur.fetchall()
    
    def insert_updated_value_into_db(self, cur, values):
        self.cur = cur
        self.cur.execute("""
            UPDATE recipes
            SET recipe_name = %s
            WHERE recipe_id = %s
        """, (values[1], values[0]))
        self.cur.execute("""
            UPDATE ingredients
            SET description = %s,
            steps = %s
            WHERE recipe_id = %s
        """, (values[2], values[3], values[0]))
        