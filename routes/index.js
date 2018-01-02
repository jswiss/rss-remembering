const express = require('express');
const router = express.Router();

const nameController = require('../controllers/nameController');
const graveController = require('../controllers/graveController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(nameController.getNames));

router.get('/table', catchErrors(nameController.loadTable));

module.exports = router;
