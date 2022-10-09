const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

route.get('/adminDashboard', userController.adminDashboard);
router.get('customerDashboard', userController.customerDashboard)
module.exports = router;
