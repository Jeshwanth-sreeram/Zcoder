const express = require('express');
const router = express.Router();
const getContests = require('../controllers/contestcontroller');


router.get('/', getContests);

module.exports = router