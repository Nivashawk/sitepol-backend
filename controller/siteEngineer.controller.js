const db = require("../model");
const User = db.user;
const CustomerLocation = db.customerlocation;
const Reason = db.reason_SE;
const MovingOut = db.moving_out_SE;
const jwt = require("jsonwebtoken");
const { createToken } = require("../middelware/authMiddleware");
const findDistance = require("../helper/distance")

// <===============================CONTROLLERS=======================================================>

// site_Engineer Login handled here
exports.login = async (req, res) => {
  const { phone_number, password } = req.body;
  try {
    var result = await User.findOne({
      where: { user_name: phone_number, user_password: password },
      attributes: ["user_name", "user_password"],
    });
    console.log(result);
    const token = createToken(result.user_name);
    if (result) {
      res.status(200).json({
        code: 200,
        status: "success",
        message: "LoggedIn successfully",
        result: {
          token: token,
        },
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


// Retrieve all details from the database.
exports.getUserDetails = async (req, res, next) => {
  const phone_number = req.body.phone_number;
  try {
    var result = await User.findOne({ where: { user_name: phone_number }, attributes:["user_id", "current_site", "current_moving_out_status", "duty_status" ] });
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
  const { user_id, latitude, longitude } = req.body;
 
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
      if (current_site_location != null) {
        distance_btw_employee_and_site =
        findDistance(
            latitude,
            longitude,
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
          await User.update(
            { duty_status: 1 },
            { where: { user_id: user_id } }
          );
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

// Retrieve all reasons for site engineer.
exports.getReasons = async (req, res, next) => {
  try {
    var result = await Reason.findAll({
      attributes: ["reason_ID", "main_reason", "sub_reason"],
    });
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


// Posting Moving out reasons
exports.MovingOutStage1 = async (req, res, next) => {
  const { user_id, reason_id, customer_id, stage, latitude, longitude } =
    req.body;
  // stage 1 moving out handled here
  if (stage === 1) {
    try {
      var result = await User.update(
        { current_moving_out_status: reason_id },
        { where: { user_id: user_id } }
      );
      if (result) {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Status updated successfully",
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
  }

  
  // stage 2 moving out handled here
  else if (stage === 2) {
    try {
      var result = await MovingOut.findOne({
        where: { reason_ID: reason_id, customer_ID: customer_id },
        attributes: ["latitude", "longitude"],
      });

      // const token = createToken(re)
      if (result) {
        distance_btw_employee_and_site =
        findDistance(latitude, longitude, result.latitude, result.longitude) *
          1000;
        if (distance_btw_employee_and_site >= 100) {
          res.status(200).json({
            code: 401,
            status: "failure",
            message:
              "your are not in the radius please move forward and try again",
          });
        } else {
          res.status(200).json({
            code: 200,
            status: "success",
            message: "site engineer reached the place successfully",
          });
        }
      }
    } catch (err) {
      res.json({
        status: "error",
        message: "unknown error found from server side",
      });
    }
  }

// stage 3 moving out handled here
  else if (stage === 3) {
    try {
      var result = await MovingOut.findOne({
        where: { reason_ID: reason_id, customer_ID: customer_id },
        attributes: ["latitude", "longitude"],
      });

      // const token = createToken(re)
      if (result) {
        distance_btw_employee_and_site =
          calcCrow(latitude, longitude, result.latitude, result.longitude) *
          1000;
        if (distance_btw_employee_and_site >= 100) {
          res.status(200).json({
            code: 401,
            status: "failure",
            message:
              "your are not in the radius please move forward and try again",
          });
        } else {
          res.status(200).json({
            code: 200,
            status: "success",
            message: "site engineer reached the place successfully",
          });
        }
      }
    } catch (err) {
      res.json({
        status: "error",
        message: "unknown error found from server side",
      });
    }
  }
};


// Tag my location handled here
exports.TagMyLocation = async (req, res, next) => {
  const { reason_id, customer_id, address, place_name, latitude, longitude } = req.body;
  // console.log("param->", reason_id, customer_id, address, place_name, latitude, longitude );
    try {
      if(reason_id === 1 || reason_id === 2){
        var result = await MovingOut.update(
          { address : address, place_name: place_name, latitude: latitude, longitude: longitude },
          { where: { reason_ID: reason_id, customer_ID: customer_id }}
        );
        console.log("result->",result[0]);
        if (result[0] !== 0) {
          res.status(200).json({
            code: 200,
            status: "success",
            message: "details updated successfully",
          });
        } else {
          res.status(200).json({
            code: 401,
            status: "failure",
            message: `customer_ID ${customer_id} is not available`,
          });
        }
      }
      else{
        res.status(200).json({
          code: 401,
          status: "failure",
          message: "reason_id should be 1 or 2",
        });

      }
      
    } catch (err) {
      res.json({
        status: "error",
        message: "unknown error found from server side",
      });
    }
}

// Off duty handled here
exports.offDuty = async (req, res, next) => {
  const { user_id, customer_id, latitude, longitude } = req.body;
    try {
      var result = await CustomerLocation.findOne({
        where: { customer_ID: customer_id },
        attributes: ["latitude", "longitude"],
      });
      console.log(result);
      if (result != null) {
        distance_btw_employee_and_site =
        findDistance(
            latitude,
            longitude,
            result.latitude,
            result.longitude
          ) * 1000;

        if (distance_btw_employee_and_site > 500) {
          res.status(200).json({
            code: 401,
            status: "failure",
            message:
              "you are not in the 500M radius of your site, please move forward and try again",
          });
        } else {
          await User.update(
            { duty_status: 0 },
            { where: { user_id: user_id } }
          );
          res.status(200).json({
            code: 200,
            status: "success",
            message: "you have updated your status successfully",
          });
        }
      } else {
        res.status(200).json({
          code: 401,
          status: "failure",
          message: "No results found for this customer id",
        });
      }
    } catch (err) {
      res.json({
        status: "error",
        message: "unknown error found from server side",
      });
    }
}

