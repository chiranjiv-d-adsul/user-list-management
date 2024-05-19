const express = require('express');
const { sendEmailToList } = require('../controllers/emailController');

const router = express.Router();

// Define the route with 'listId' as a URL parameter
router.post('/:listId/send-email', sendEmailToList);

module.exports = router;
