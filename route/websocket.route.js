const express = require('express')
const router = express.Router();
const WebsocketController = require('../controller/websocket.controller')


router.post('/websocket',  WebsocketController.liveLocation)
// router.get('/websocket', SiteEngineerController.websocket)




module.exports = router