const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const listId = '664a2937312e9d365a98d418';
const filePath = 'uploads/sample.csv';

const form = new FormData();
form.append('file', fs.createReadStream(filePath));

axios.post(`http://localhost:5000/chiru/v1/lists/list/`, form, {
  headers: {
    ...form.getHeaders(),
  },
})
.then(response => {
  console.log('Response:', response.data);
})
.catch(error => {
  console.error('Error:', error.response ? error.response.data : error.message);
});
