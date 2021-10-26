const express = require('express')
const router = express.Router();
const EmployeeController = require('../controller/employee.controller')

router.get('/get', EmployeeController.getEmployeeDetails)




module.exports = router