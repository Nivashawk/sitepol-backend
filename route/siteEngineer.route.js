const express = require('express')
const router = express.Router();
const {requireAuth} = require('../middelware/authMiddleware')
const SiteEngineerController = require('../controller/siteEngineer.controller')
const validation = require('../middelware/validateMiddleware')

router.get('/login', validation.login, SiteEngineerController.login)
router.get('/getdetails', requireAuth, SiteEngineerController.getUserDetails)
router.get('/getreasons', requireAuth, SiteEngineerController.getReasons)
router.get('/onduty', requireAuth, validation.onduty, SiteEngineerController.onDuty)
router.post('/movingout1', requireAuth, validation.movingoutStage1, SiteEngineerController.MovingOutStage1)
// router.get('/websocket', SiteEngineerController.websocket)




module.exports = router