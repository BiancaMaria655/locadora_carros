const express = require('express');
const router = express.Router();

const UserController = require('../controllers/customerController');

router.get('/cadastro', UserController.newCustomer);
router.post('/cadastro', UserController.newCustomerSave);
router.get('/atualizar/:id', UserController.updateCustomer);
router.post('/atualizar', UserController.updateCustomerSave);
router.get('/apagar', UserController.removeCustomerConfirmacao);
router.post('/apagar', UserController.removeCustomer);
router.get('/dashboard', UserController.customerDashboard);

module.exports = router;