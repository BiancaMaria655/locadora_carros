const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const User = require('../models/User')

router.get('/login', UserController.login)
router.post('/login', UserController.loginSend)
router.get('/logout', UserController.logout)
router.get('/cadastro', UserController.newCustomer)
router.post('/cadastro', UserController.newCustomerSave)
router.get('/alterar/:id', UserController.updateCustomer)
router.post('/alterar', UserController.updateCustomerSave)
router.post('/apagar', UserController.removeCustomer)
router.get('/dashboard', UserController.customerDashboard)

module.exports = router