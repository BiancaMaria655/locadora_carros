const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')

router.get('/dashboard', UserController.adminDashboard)


module.exports = router