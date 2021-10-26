const express = require('express')
const router = express.Router();
const SiteEngineerController = require('../controller/siteEngineer.controller')

router.get('/getdetails', SiteEngineerController.getUserDetails)
router.get('/login', SiteEngineerController.login)
router.get('/onduty', SiteEngineerController.onDuty)
// router.get('/websocket', SiteEngineerController.websocket)




module.exports = router