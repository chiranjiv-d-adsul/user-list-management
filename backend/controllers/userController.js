const UserList = require('../models/UserList');
// const User = require('../models/User');
const csvParser = require('../utils/csvParser');

const addUserFromCSV = async (req, res) => {
  const listId = req.params.id;
  const userList = await UserList.findById(listId);
  if (!userList) return res.status(404).send('List not found');

  const { successCount, errors, totalCount } = await csvParser.parseCSV(req.file.path, userList);

  res.send({ successCount, errorCount: errors.length, errors, totalCount });
};

module.exports = { addUserFromCSV };