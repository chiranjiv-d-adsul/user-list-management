

import React, { useEffect, useState } from 'react';
import { getAllLists } from '../api';
import UploadCSV from './UploadCSV';
import EmailForm from './EmailForm';
import UserTable from './UserTable';

const UserList = () => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getAllLists();
        setLists(data);
        if (data.length > 0) {
          setSelectedListId(data[0]._id); // Set the first list as the default selected list
        }
      } catch (error) {
        console.error('Error fetching user lists:', error);
      }
    };
    fetchLists();
  }, []);

  const handleListChange = (event) => {
    setSelectedListId(event.target.value);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Lists</h2>
      <div className="mb-4">
        <label htmlFor="listSelect" className="block text-lg font-semibold mb-2">Select a List:</label>
        <select
          id="listSelect"
          value={selectedListId}
          onChange={handleListChange}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          {lists.map(list => (
            <option key={list._id} value={list._id}>
              {list.title}
            </option>
          ))}
        </select>
      </div>
      {selectedListId && (
        <div className="bg-gray-100 rounded-md p-4 mb-4">
          <UploadCSV listId={selectedListId} />
          <EmailForm listId={selectedListId} />
          {/* <UserTable listId={selectedListId} /> Pass the selected list ID to UserTable */}
        </div>
      )}
    </div>
  );
};

export default UserList;
