const express = require('express');
const router = express.Router();
const LocController = require('../controllers/LocController')



router.get('/adicionar/:id', LocController.newLoc)
router.post('/adicionar/:id', LocController.newLocSave)
router.get('/todas', LocController.allLoc)
router.get('/editar/:id', LocController.updateLoc)
router.post('/editar/:id', LocController.updateLocSave)
router.post('/remover', LocController.removeLoc)

module.exports = router