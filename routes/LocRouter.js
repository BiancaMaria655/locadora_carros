const express = require('express');
const router = express.Router();
const LocController = require('../controllers/LocController')

router.get('/add', LocController.newLoc)
router.post('/add', LocController.newLocSave)
router.get('/allLoc', LocController.allLoc)
router.get('/edit/:id', LocController.updateLoc)
router.post('/edit', LocController.updateLocSave)
router.post('/removeLoc', LocController.removeLoc)

module.exports = router