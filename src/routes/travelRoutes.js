const express = require('express');
const router = express.Router();
const { computeTravelBudget } = require('../controllers/travelController');

router.post('/travel-budget', computeTravelBudget);

module.exports = router;
