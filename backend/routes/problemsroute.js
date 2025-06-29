const express = require('express')
const router = express.Router()
const { getProblems, getProblem } = require('../controllers/problemcontroller');



router.post('/', getProblems);
router.post('/singleproblem', getProblem);


module.exports = router