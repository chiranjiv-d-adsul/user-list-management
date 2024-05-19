import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getList } from '../api'; // Ensure this API call fetches the list correctly

const UserTable = ({ listId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getList(listId);
        setUsers(data.users); // Assuming data.users contains the populated user details
      } catch (error) {
        console.error(`Error fetching users for list ${listId}:`, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [listId]);

  const handleEmail = (email) => {
    console.log(`Email button clicked for ${email}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) && users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button onClick={() => handleEmail(user.email)}>Email</button></td>
          </tr>
        ))}
        {!Array.isArray(users) && (
          <tr>
            <td colSpan="3">No users found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  listId: PropTypes.string.isRequired
};

export default UserTable;
