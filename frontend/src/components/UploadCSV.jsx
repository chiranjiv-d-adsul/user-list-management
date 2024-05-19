// UploadCSV.jsx
import React, { useState } from 'react';
import { uploadCSV } from '../api'; // Importing the API function to upload CSV

const UploadCSV = ({ listId }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    await uploadCSV(listId, file); // Assuming uploadCSV function takes listId and file
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload CSV</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".csv"
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
    </form>
  );
};

export default UploadCSV;
