const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const UserController = require('../controllers/customerController');

router.get('/cadastro', UserController.newCustomer);
router.post('/cadastro', UserController.newCustomerSave);
router.get('/atualizar/:id',authController.verifyIfSessionExists, UserController.updateCustomer);
router.post('/atualizar',authController.verifyIfSessionExists, UserController.updateCustomerSave);
router.get('/apagar',authController.verifyIfSessionExists, UserController.removeCustomerConfirmacao);
router.post('/apagar',authController.verifyIfSessionExists, UserController.removeCustomer);
router.get('/dashboard',authController.verifyIfSessionExists, UserController.customerDashboard);
module.exports = router;