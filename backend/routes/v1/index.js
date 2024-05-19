const express = require('express');
const router = express.Router();
const listRoutes = require('../listRoutes');
const userRoutes = require('../userRoutes');
const emailRoutes = require('../emailRoutes');

router.use('/lists', listRoutes);
router.use('/users', userRoutes);
router.use('/emails', emailRoutes);

module.exports = router;
