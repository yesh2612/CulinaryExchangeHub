from flask import Flask
from psycopg2 import connect
import psycopg2

class DB_Operations:
    def __init__(self, cur):
        self.cur = cur

    def create_users_table(self, cur):
        self.cur = cur
        self.cur.execute("""CREATE TABLE users(User_ID SERIAL PRIMARY KEY, User_Name VARCHAR(50) UNIQUE NOT NULL, User_Password VARCHAR(50));""")
    
    def insert_into_users_table(self, cur, values):
        self.cur = cur

        insert_query = """INSERT INTO users(User_Name, User_Password) VALUES (%s, %s);"""
        insert_records = (values[0][0], values[0][1])
        self.cur.execute(insert_query, insert_records)
    def display_users_table(self, cur):
        self.cur = cur
        self.cur.execute("SELECT * FROM users")
        return self.cur.fetchall()

