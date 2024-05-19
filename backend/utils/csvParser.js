const csv = require('csv-parser');
const fs = require('fs');
const User = require('../models/User');

const parseCSV = (filePath, userList) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const errors = [];
    let successCount = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', async () => {
        for (const userData of results) {
          const { name, email, ...customProps } = userData;
          if (!name || !email) {
            errors.push({ row: userData, error: 'Missing required fields' });
            continue;
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            errors.push({ row: userData, error: 'Duplicate email' });
            continue;
          }

          const properties = {};
          userList.customProperties.forEach(prop => {
            properties[prop.title] = customProps[prop.title] || prop.defaultValue;
          });

          const newUser = new User({ name, email, properties });
          await newUser.save();
          userList.users.push(newUser._id);
          successCount++;
        }

        await userList.save();
        resolve({ successCount, errors, totalCount: userList.users.length });
      });
  });
};

module.exports = { parseCSV };
