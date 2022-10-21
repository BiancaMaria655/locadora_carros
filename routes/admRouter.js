const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.get('/dashboard', AdminController.adminDashboard);
router.post('/adicionar', AdminController.newAdminSave);

router.post('/editar', AdminController.updateAdmin);
router.post('/excluir', AdminController.deleteAdmin);
module.exports = router;