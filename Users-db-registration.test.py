# Users_db_registrationrest.py

import unittest
from unittest.mock import patch, MagicMock
from Registration import registration

class TestRegistration(unittest.TestCase):

    @patch('psycopg2.connect')
    @patch('db_operations.DB_Operations')
    def test_registration(self, mock_db_operations, mock_connect):

        mock_conn = MagicMock()
        mock_cur = MagicMock()
        mock_db_operations.return_value = MagicMock(insert_into_users_table=MagicMock(), set_cursor=MagicMock(return_value=None))

        mock_connect.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cur

        # Prepare test data
        test_data = {'username': 'test_user', 'password': 'test_password'}

        # Call the registration function
        response = registration(test_data, mock_db_operations)

        # Check if the correct JSON response is returned
        self.assertEqual(response.json, {'message': 'Login successful'})

        # Check if the necessary methods were called with the correct arguments
        mock_db_operations.assert_called_once_with(mock_cur)
        mock_db_operations.return_value.insert_into_users_table.assert_called_once_with([(test_data['username'], test_data['password'])])
        mock_conn.commit.assert_called_once()
        mock_cur.close.assert_called_once()
        mock_conn.close.assert_called_once()

if __name__ == '__main__':
    unittest.main()
