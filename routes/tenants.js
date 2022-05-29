const express = require('express');
const router = express.Router();
const tenantsController = require('../controllers/tenants');

router.get('/:id', tenantsController.getTenant);

module.exports = router;
