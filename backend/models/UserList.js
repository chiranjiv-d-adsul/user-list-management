const mongoose = require('mongoose');

const customPropertySchema = new mongoose.Schema({
  title: String,
  defaultValue: String,
}, { _id: false });

const userListSchema = new mongoose.Schema({
  title: String,
  customProperties: [customPropertySchema],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('UserList', userListSchema);
