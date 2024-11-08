const express = require('express');
const matchController = require('../controllers/matchController');
const router = express.Router();

router.post('/start', matchController.startMatch);
router.post('/submit', matchController.submitSolution);
router.get('/:matchId', matchController.getMatchDetails);

module.exports = router;