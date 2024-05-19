const express = require('express');
const { createList, getAllLists, getList } = require('../controllers/listController');
const { get } = require('mongoose');

const router = express.Router();

router.post('/', createList);
router.get('/lists', getAllLists);
router.get('/:id/list', getList);

module.exports = router;
