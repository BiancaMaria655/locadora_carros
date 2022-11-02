const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController')
const authController = require('../controllers/authController');
const { verifyIfSessionExists } = require('../controllers/authController');

router.get('/adicionar', verifyIfSessionExists, CarController.newCar)
router.post('/adicionar', verifyIfSessionExists, CarController.newCarSave)
router.get('/todos', verifyIfSessionExists, CarController.allCars)
router.get('/editar/:id',verifyIfSessionExists, CarController.updateCar)
router.post('/editar', verifyIfSessionExists, CarController.updateCarSave)
router.post('/remover',verifyIfSessionExists, CarController.removeCar)
router.get('/frota', verifyIfSessionExists,  CarController.buscaFrota)
module.exports = router