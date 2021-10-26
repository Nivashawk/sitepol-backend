const express = require('express')
const router = express.Router();
const {requireAuth} = require('../middelware/authMiddleware')
const SiteEngineerController = require('../controller/siteEngineer.controller')

router.get('/getdetails', requireAuth, SiteEngineerController.getUserDetails)
router.get('/login', SiteEngineerController.login)
router.get('/onduty', SiteEngineerController.onDuty)
// router.get('/websocket', SiteEngineerController.websocket)




module.exports = router