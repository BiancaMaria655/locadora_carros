const express = require('express');
const router = express.Router();
const LocController = require('../controllers/LocController')
const authController = require('../controllers/authController')


router.get('/adicionar/:id',authController.verifyIfSessionExists, LocController.newLoc)
router.post('/adicionar/:id',authController.verifyIfSessionExists, LocController.newLocSave)

router.get('/todasAdm',authController.verifyIfSessionExists, LocController.allLoc)
router.get('/todasUsu',authController.verifyIfSessionExists, LocController.allLocUsu)

router.get('/editarAdm/:id',authController.verifyIfSessionExists, LocController.updateLocAdm)
router.post('/editarAdm/:id',authController.verifyIfSessionExists, LocController.updateLocSaveAdm)

router.get('/editar/:id',authController.verifyIfSessionExists, LocController.updateLoc)
router.post('/editar/:id',authController.verifyIfSessionExists, LocController.updateLocSave)

router.post('/remover',authController.verifyIfSessionExists, LocController.removeLoc)

router.post('/devolver/:id', authController.verifyIfSessionExists,LocController.devolverVeiculo)

module.exports = router