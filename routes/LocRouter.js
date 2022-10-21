const express = require('express');
const router = express.Router();
const LocController = require('../controllers/LocController')

router.get('/adicionar', LocController.newLoc)
router.post('/adicionar', LocController.newLocSave)
router.get('/todas', LocController.allLoc)
router.get('/editar/:id', LocController.updateLoc)
router.post('/editar', LocController.updateLocSave)
router.post('/remover', LocController.removeLoc)

module.exports = router