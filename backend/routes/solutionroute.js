const express = require('express')
const router = express.Router()
const { getSolutionsByHandle, getSolutionsByPID, postSolution, deleteSolution } = require('../controllers/solutioncontroller')



router.post('/byhandle', getSolutionsByHandle);
router.post('/bypid', getSolutionsByPID);
router.post('/create', postSolution);
router.delete('/delete', deleteSolution);


module.exports = router