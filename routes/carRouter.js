const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController')

router.get('/adicionar', CarController.newCar)
router.post('/adicionar', CarController.newCarSave)
router.get('/todos', CarController.allCars)
router.get('/editar/:id', CarController.updateCar)
router.post('/editar', CarController.updateCarSave)
router.post('/remover', CarController.removeCar)

module.exports = router