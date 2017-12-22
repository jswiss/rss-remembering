const express = require('express');
const router = express.Router();

const personController = require('../controllers/personController');
const graveController = require('../controllers/graveController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(personController.getPeople));

module.exports = router;
