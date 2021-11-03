require('dotenv').config();
const express = require('express')
const app = express();
// const server = require('http').createServer(app);
const cors = require('cors')
const mysql = require('mysql2');


var port = 3000;
var host = "0.0.0.0"; //must be string

//Import Routes
const employee = require('./route/employee.route')
const siteEngineer = require('./route/siteEngineer.route')
const liveLocation = require('./route/websocket.route')


// temporarily added for develoopment
// const db = require("./model");
// db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//ROUTES
app.use('/employee', employee)
app.use('/site-engineer', siteEngineer)
app.use('/', liveLocation)

//Listening to the server
app.listen(port, host, function() {
    console.log(`Server is running on Host: ${host}:${port}`);
  });