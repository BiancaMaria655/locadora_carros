const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController')

router.get('/add', CarController.newCar)
router.post('/add', CarController.newCarSave)
router.get('/allCars', CarController.allCars)
router.get('/edit/:id', CarController.updateCar)
router.post('/edit', CarController.updateCarSave)
router.post('/removeCar', CarController.removeCar)

module.exports = router