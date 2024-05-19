const express = require('express');
const multer = require('multer');
const { addUserFromCSV } = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/:id/userList', upload.single('file'), addUserFromCSV); // Changed from '/:id/users' to '/lists/:id/users'

module.exports = router;
