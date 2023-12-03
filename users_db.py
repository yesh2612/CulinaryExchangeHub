from flask import Flask
from psycopg2 import connect
import psycopg2

class DB_Operations:
    def __init__(self, cur):
        self.cur = cur

    def create_users_table(self, cur):
        self.cur = cur
        self.cur.execute("""CREATE TABLE users(User_ID SERIAL PRIMARY KEY, User_Name VARCHAR(50) , User_Password VARCHAR(50), email_id VARCHAR(50) UNIQUE NOT NULL);""")
    
    def insert_into_users_table(self, cur, values):
        self.cur = cur

        insert_query = """INSERT INTO users(email_id, User_Name, User_Password) VALUES (%s, %s, %s);"""
        insert_records = (values[0][0], values[0][1], values[0][2])
        self.cur.execute(insert_query, insert_records)
        
    def check_user_exist(self, cur, email_id, password):
        self.cur = cur
        print("username{}passsoword{}".format(email_id, password))
        self.cur.execute("SELECT COUNT(*) FROM users WHERE email_id = %s AND User_Password = %s", (email_id, password))
        count = self.cur.fetchone()[0]
        print("count{}".format(count))
        return count

    def set_new_password(self, cur, email_id, password):
        self.cur = cur
        self.cur.execute("UPDATE users SET user_password = %s WHERE email_id = %s", (password, email_id))
        
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

    def check_user_email_exist(self, cur, email_id):
        self.cur = cur
        self.cur.execute("SELECT COUNT(*) FROM users WHERE email_id = %s", (email_id,))
        count = self.cur.fetchone()[0]
        print("count{}".format(count))
        return count

    def get_user_id_by_email(self, cur, email_id):
        self.cur = cur
        self.cur.execute("SELECT user_id FROM users WHERE email_id = %s", (email_id,))
        return self.cur.fetchone()
    
    def get_user_name_by_email(self, cur, email_id):
        self.cur = cur
        self.cur.execute("SELECT user_name FROM users WHERE email_ID = %s", (email_id,))

        result = self.cur.fetchone()

        if result:
            return result[0]
        else:
            return None