const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authController = require('../controllers/authController')

router.get('/dashboard',authController.verifyIfSessionExists, AdminController.adminDashboard);
router.post('/adicionar',authController.verifyIfSessionExists, AdminController.newAdminSave);

router.post('/editar',authController.verifyIfSessionExists, AdminController.updateAdmin);
router.post('/excluir',authController.verifyIfSessionExists, AdminController.deleteAdmin);
module.exports = router;