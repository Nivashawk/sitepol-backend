const db = require("../model");
const User = db.user;
const CustomerLocation = db.customerlocation;
const jwt = require('jsonwebtoken')
const {createToken} = require('../middelware/authMiddleware')
const { check, validationResult } = require('express-validator');



// const Op = db.Sequelize.Op;

// <===============================CONTROLLERS=======================================================>

exports.login =  async (req, res) => {

  // const errors = validationResult(req);
  // if(!errors.isEmpty())
  // {
  //   return res.status(200).json({
  //     code: 402,
  //     status: "failure",
  //     message: "validation error",
  //     result : {
  //       errors : errors.array(),
  //     }
  //   });
  // }
  const user_name = req.body.phone_number;
  const user_password = req.body.password;
  try {
    var result = await User.findOne({ where: { user_name: user_name, user_password: user_password },attributes: ["user_name","user_password"], });
    console.log(result);
    const token = createToken(result.user_name)
    if (result) {
      res.status(200).json({
        code: 200,
        status: "success",
        message: "LoggedIn successfully",
        result : {
          token : token,
          SE_name : result.user_name
        }
      });
    } else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "Please check the credentials",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }

};

// Retrieve all Tutorials from the database.
exports.getUserDetails = async (req, res, next) => {
  const user_id = req.body.user_id;
  try {
    var result = await User.findOne({ where: { user_id: user_id } });
    // const token = createToken(re)
    if (result) {
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Documents fetched successfully",
        result,
      });
    } else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "No results found",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }
};

// onduty API handled here
exports.onDuty = async (req, res, next) => {
  const user_id = req.body.user_id;
  const lat1 = req.body.latitude;
  const long1 = req.body.longitude;
  try {
    var find_current_site_of_employee = await User.findOne({
      where: { user_id: user_id },
      attributes: ["current_site"],
    });
    if (find_current_site_of_employee !== null) {
      // console.log(find_current_site_of_employee);
      const current_site = find_current_site_of_employee.current_site;
      // console.log("current ->", current_site);

      var current_site_location = await CustomerLocation.findOne({
        where: { customer_ID: current_site },
        attributes: ["latitude", "longitude"],
      });
      // console.log("current_site_location ->",current_site_location);
      if (
        current_site_location != null
      ) {
        distance_btw_employee_and_site =
          calcCrow(
            lat1,
            long1,
            current_site_location.latitude,
            current_site_location.longitude
          ) * 1000;

        if (distance_btw_employee_and_site > 500) {
          res.status(200).json({
            code: 401,
            status: "failure",
            message:
              "you are not in the 500M radius of your site, please move forward and try again",
          });
        } else {
          res.status(200).json({
            code: 200,
            status: "success",
            message: "your attendance for the day is marked successfully",
          });
        }
      } else {
        res.status(200).json({
          code: 401,
          status: "failure",
          message: "No results found for this customer id",
        });
      }
    } else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "No results found for this user id",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }
};


// <===============================Functions=======================================================>

// latitude and logitude distance calculation
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return (Math.round(d * 100) / 100).toFixed(2);
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}



//JWT token created here

// const maxTime = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'secret key', {
//     expiresIn: maxTime
//   }); 
// }