const express = require('express')
const router = express.Router();
const {requireAuth} = require('../middelware/authMiddleware')
const SiteEngineerController = require('../controller/siteEngineer.controller')
const validation = require('../middelware/validateMiddleware')

router.post('/login', validation.login, SiteEngineerController.login)
router.post('/getdetails',  validation.getdetails, SiteEngineerController.getUserDetails)
router.post('/getreasons', SiteEngineerController.getReasons)
router.post('/onduty',  validation.onduty, SiteEngineerController.onDuty)
router.post('/movingout',   validation.movingoutStage1, SiteEngineerController.MovingOutStage1)
router.post('/taglocation',   validation.tagLocation, SiteEngineerController.TagMyLocation)
router.post('/offduty',  validation.offduty, SiteEngineerController.offDuty)
router.post('/create',  SiteEngineerController.create)
router.post('/createReasons',  SiteEngineerController.createReasons)
router.post('/checkin',  SiteEngineerController.checkIn)
router.post('/checkout',  SiteEngineerController.checkout)
router.post('/getSiteEnginnerDetails',  SiteEngineerController.getSiteEnginnerDetails)
// router.get('/websocket', SiteEngineerController.websocket)




module.exports = router