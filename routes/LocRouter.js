const express = require('express');
const router = express.Router();
const LocController = require('../controllers/LocController')


router.get('/adicionar/:id', LocController.newLoc)
router.post('/adicionar/:id', LocController.newLocSave)

router.get('/todasAdm', LocController.allLoc)
router.get('/todasUsu', LocController.allLocUsu)

router.get('/editarAdm/:id', LocController.updateLocAdm)
router.post('/editarAdm/:id', LocController.updateLocSaveAdm)

router.get('/editar/:id', LocController.updateLoc)
router.post('/editar/:id', LocController.updateLocSave)

router.post('/remover', LocController.removeLoc)

module.exports = router