import unittest
from unittest.mock import MagicMock
from users_db import DB_Operations

class TestDBOperations(unittest.TestCase):

    def setUp(self):
        self.mock_cursor = MagicMock()

    def test_create_users_table(self):
        db_operations = DB_Operations(self.mock_cursor)
        db_operations.create_users_table(self.mock_cursor)

        expected_query = """CREATE TABLE users(User_ID SERIAL PRIMARY KEY, User_Name VARCHAR(50) UNIQUE NOT NULL, User_Password VARCHAR(50));"""
        self.mock_cursor.execute.assert_called_once_with(expected_query)

    def test_insert_into_users_table(self):
        db_operations = DB_Operations(self.mock_cursor)
        values = [("test_user", "test_password")]

        db_operations.insert_into_users_table(self.mock_cursor, values)

        expected_query = """INSERT INTO users(User_Name, User_Password) VALUES (%s, %s);"""
        expected_records = ("test_user", "test_password")
        self.mock_cursor.execute.assert_called_once_with(expected_query, expected_records)

    def test_display_users_table(self):
        db_operations = DB_Operations(self.mock_cursor)

        result = db_operations.display_users_table(self.mock_cursor)

        self.mock_cursor.execute.assert_called_once_with("SELECT * FROM users")
        self.assertEqual(result, self.mock_cursor.fetchall())

if __name__ == '__main__':
    unittest.main()
