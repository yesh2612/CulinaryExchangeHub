from flask import Flask
from psycopg2 import connect
import psycopg2

class DB_Operations:
    def __init__(self, cur):
        self.cur = cur

    def create_users_table(self, cur):
        self.cur = cur
        self.cur.execute("""CREATE TABLE users(User_ID SERIAL PRIMARY KEY, User_Name VARCHAR(50) , User_Password VARCHAR(50), email_id UNIQUE NOT NULL);""")
    
    def insert_into_users_table(self, cur, values):
        self.cur = cur

        insert_query = """INSERT INTO users(User_Name, User_Password) VALUES (%s, %s);"""
        insert_records = (values[0][0], values[0][1])
        self.cur.execute(insert_query, insert_records)
        
    def check_user_exist(self, cur, email_id, password):
        self.cur = cur
        self.cur.execute("SELECT COUNT(*) FROM users WHERE email_id = %s AND User_Password = %s", (email_id, password))
        count = self.cur.fetchone()[0]
        print("count{}".format(count))
        return count

    def get_user_name(self, cur, email_id, password):
        self.cur = cur
        self.cur.execute("SELECT user_name FROM users WHERE email_ID = %s AND user_Password = %s", (email_id, password))

        result = self.cur.fetchone()

        if result:
            return result[0]
        else:
            return None

    def display_users_table(self, cur):
        self.cur = cur
        self.cur.execute("SELECT * FROM users")
        return self.cur.fetchall()

