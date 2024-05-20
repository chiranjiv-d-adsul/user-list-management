const UserList = require('../models/UserList');
const User = require('../models/User');

const createList = async (req, res) => {
  const { title, customProperties } = req.body;
  const newList = new UserList({ title, customProperties });
  await newList.save();
  res.status(201).send(newList);
};

// const createList = async (req, res) => {
//   const { title, customProperties } = req.body;

//   // Ensure customProperties is an object
//   const cityProperty = { name: 'city', label: 'City' }; // Define city property
//   const newCustomProperties = { ...customProperties, city: cityProperty };

//   const newList = new UserList({ title, customProperties: newCustomProperties });
//   await newList.save();
//   res.status(201).send(newList);
// };

const getList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const list = await User.findById(listId).populate('users');
    comsole.log(list);
    res.json(list);
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getList };


const getAllLists = async (req, res) => {
  try {
    const lists = await UserList.find();
    res.send(lists);
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = { createList, getList, getAllLists };
