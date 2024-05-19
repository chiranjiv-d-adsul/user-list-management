import React, { useState } from 'react';
import { createList } from '../api';

const CreateList = () => {
  const [title, setTitle] = useState('');
  const [customProperties, setCustomProperties] = useState([{ title: '', defaultValue: '' }]);

  const handleAddProperty = () => {
    setCustomProperties([...customProperties, { title: '', defaultValue: '' }]);
  };

  const handlePropertyChange = (index, field, value) => {
    const newProperties = [...customProperties];
    newProperties[index][field] = value;
    setCustomProperties(newProperties);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createList({ title, customProperties });
    setTitle('');
    setCustomProperties([{ title: '', defaultValue: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create List</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List Title"
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      {customProperties.map((prop, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            value={prop.title}
            onChange={(e) => handlePropertyChange(index, 'title', e.target.value)}
            placeholder="Property Title"
            className="border border-gray-300 rounded-md px-3 py-2 mr-2"
          />
          <input
            type="text"
            value={prop.defaultValue}
            onChange={(e) => handlePropertyChange(index, 'defaultValue', e.target.value)}
            placeholder="Default Value"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddProperty} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Add Property</button>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Create List</button>
    </form>
  );
};

export default CreateList;
