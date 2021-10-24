const express = require('express')
const app = express();
const cors = require('cors')
const mysql = require('mysql');

// const url = "mongodb+srv://vijayvijay1997:sunder.vj@cluster0.s3gkt.mongodb.net/bustracker?authSource=admin&replicaSet=atlas-78d6x4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"


//Connect to the db
const con = mysql.createConnection({
  connectionLimit: 10,
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'sitepol'
  });


  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

var port = 3000;
var host = '0.0.0.0' //must be string

//Import Routes
const employee = require('./routes/user_routes')
// const driver = require('./routes/productRoutes')

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//ROUTES
app.use('/user', user)

//Listening to the server
app.listen(port, host, function() {
    console.log(`Server is running on Host: ${host}:${port}`);
  });