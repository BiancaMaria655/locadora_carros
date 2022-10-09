const express = require('express');
const router = express.Router();
const adminRoute = require('./adminRoute')
const userController = require('../controllers/userController');

router.use('/adminDashboard', adminRoute)

route.get('/adminDashboard', userController.adminDashboard);
router.get('customerDashboard', userController.customerDashboard)
module.exports = router;
