const db = require("../model");
const User = db.user;
var axios = require("axios");
const CustomerLocation = db.customerlocation;
const Reason = db.reason_SE;
const MovingOut = db.moving_out_SE;
const TRACK_SITE_ENGINEER = db.track_siteEngineer;
const StaticMovingOut = db.StaticMovingOut
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { createToken } = require("../middelware/authMiddleware");
const findDistance = require("../helper/distance");
const quality_time = require("../helper/calculate_quality");
const route_distance = require("../helper/google_distance");
// const current_hour = require("../helper/current_time");

const current_hour = new Date();

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
  const today = new Date().toISOString().split("T")[0];
  const phone_number = req.body.phone_number;
  try {
    var data = await User.findOne({
      where: { user_name: phone_number },
      attributes: ["user_id", "current_site", "tag_my_location_status"],
    });
    // const token = createToken(re)
    if (data) {
      var details = await TRACK_SITE_ENGINEER.findOne({
        where: {
          user_id: data.user_id,
          current_site: data.current_site,
          date: today,
        },
        attributes: [
          "user_id",
          "current_site",
          "onduty_status",
          "moving_out_status",
          "start_reason_id",
        ],
      });
      if( details !== null){
        result = {
          user_id: details.user_id,
          current_site: details.current_site,
          current_moving_out_status: details.moving_out_status,
          duty_status: details.onduty_status,
          reason_id: details.start_reason_id,
          tag_my_location_status: data.tag_my_location_status,
        };
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Documents fetched successfully",
          result,
        });
      } else {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "No results found",
          result : {
            user_id: data.user_id,
            duty_status : 0,
          }
        });
      }
      }else{
        es.status(200).json({
          code: 200,
          status: "success",
          message: "No results found",
          result : {
            user_id: data.user_id,
            duty_status : 0
          }
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
  // const date = new Date();
  const today = new Date().toISOString().split("T")[0];
  console.log(today);

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
        } 
        else {
          var index_check = await TRACK_SITE_ENGINEER.findOne({
            where: { user_id: user_id, date: today },
            attributes: ["user_id"],
          });
          console.log("index->", index_check);
          if (index_check === null) {
            await TRACK_SITE_ENGINEER.create({
              onduty_status: 1,
              user_id: user_id,
              current_site: current_site,
              onduty_status: 1,
              duty_started: current_hour,
            });
            res.status(200).json({
              code: 200,
              status: "success",
              message: "your attendance for the day is marked successfully",
            });
          } else {
            res.status(200).json({
              code: 200,
              status: "success",
              message: "you have already marked your attenadnce for today",
            });
          }
        }
      } 
      else {
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
  const today = new Date().toISOString().split("T")[0];
  const { user_id, reason_id, customer_id, stage, latitude, longitude } =
    req.body;

  // stage 1 select reasons
  if (stage === 0) {
    try {
      var result = await TRACK_SITE_ENGINEER.update(
        { start_reason_id: reason_id, moving_out_status: 1 },
        { where: { user_id: user_id, date: today } }
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

  // stage 2 are you reached the location
  else if (stage === 1) {
    try {
      if(reason_id === 1 || reason_id === 2)
      {
        var result = await MovingOut.findOne({
          where: { reason_ID: reason_id, Customer_ID: customer_id },
          attributes: ["latitude", "longitude"],
        });
        if (result) {
          distance_btw_employee_and_site =
            findDistance(latitude, longitude, result.latitude, result.longitude) *
            1000;
          if (distance_btw_employee_and_site > 500) {
            
            res.status(200).json({
              code: 401,
              status: "failure",
              message:
                "your are not in the radius please move forward and try again",
            });
          } else {
            var result = await TRACK_SITE_ENGINEER.update(
              { moving_out_status: 2 },
              { where: { user_id: user_id, date: today } }
            );
            // route_distance()
            res.status(200).json({
              code: 200,
              status: "success",
              message: "site engineer reached the place successfully",
            });
          }
        }else{
          res.status(200).json({
            code: 201,
            status: "failure",
            message: "Please save locations for this site",
          });
        }
      }
      else
      {
        var result = await StaticMovingOut.findOne({
          where: { reason_ID: reason_id},
          attributes: ["latitude", "longitude"],
        });
        if (result) {
          distance_btw_employee_and_site =
            findDistance(latitude, longitude, result.latitude, result.longitude) *
            1000;
          if (distance_btw_employee_and_site > 500) {
            
            res.status(200).json({
              code: 401,
              status: "failure",
              message:
                "your are not in the radius please move forward and try again",
            });
          } else {
            var result = await TRACK_SITE_ENGINEER.update(
              { moving_out_status: 2 },
              { where: { user_id: user_id, date: today } }
            );
            // route_distance()
            res.status(200).json({
              code: 200,
              status: "success",
              message: "site engineer reached the place successfully",
            });
          }
        }else{
          res.status(200).json({
            code: 201,
            status: "failure",
            message: "Please save locations for this site",
          });
        }
      }
      // const token = createToken(re)  
    } catch (err) {
      res.json({
        status: "error",
        message: "unknown error found from server side",
      });
    }
  }

  // stage 3 are you returning to site
  else if (stage === 2) {
    try {
      var result = await TRACK_SITE_ENGINEER.update(
        { moving_out_status: 3 },
        { where: { user_id: user_id, date: today } }
      );
      res.status(200).json({
        code: 200,
        status: "success",
        message: "your are moving towards site",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: "unknown error found from server side",
      });
    }
  }

  // stage 3 reached the site
  else if (stage === 3) {
    try {
      var result = await TRACK_SITE_ENGINEER.update(
        { moving_out_status: 0 },
        { where: { user_id: user_id, date: today } }
      );
      res.status(200).json({
        code: 200,
        status: "success",
        message: "your reached site",
      });
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
  const { reason_id, customer_id, address, place_name, latitude, longitude } =
    req.body;
  // console.log("param->", reason_id, customer_id, address, place_name, latitude, longitude );
  try {
    if (reason_id === 1 || reason_id === 2) {
      var result = await MovingOut.create(
        {
          reason_ID: reason_id, 
          Customer_ID: customer_id,
          address: address,
          place_name: place_name,
          latitude: latitude,
          longitude: longitude,
        }
      );
      if (result) {
        
        const index = await MovingOut.count({ where: { Customer_ID: customer_id }});
        if(index === 2)
        {
          var update_tag_status = await User.update(
            { tag_my_location_status: 1},
            { where: { current_site: customer_id } }
          );
          console.log(update_tag_status);
          res.status(200).json({
            code: 200,
            status: "success",
            message: "details updated successfully",
          }); 
        }
        else if(index === 1){
          res.status(200).json({
            code: 200,
            status: "success",
            message: "details updated successfully",
          }); 
        }  
        else if(index !== 1 || index > 2){
          res.status(200).json({
            code: 200,
            status: "success",
            message: "tag my location for this site is already updated",
          }); 
        }  
      }
      else {
        res.status(200).json({
          code: 401,
          status: "failure",
          message: `customer_ID ${customer_id} is not available`,
        });
      }
    } else {
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
};

// Off duty handled here
exports.offDuty = async (req, res, next) => {
  const today = new Date().toISOString().split("T")[0];
  const { user_id, customer_id, latitude, longitude } = req.body;
  try {
    await TRACK_SITE_ENGINEER.update(
      { onduty_status: 0, duty_ended: current_hour },
      {
        where: {
          user_id: user_id,
          date: today,
        },
      }
    ).then(async function (result) {
      console.log(result[0]);
      if (result[0] === 1) {
        var getWorkingHours = await TRACK_SITE_ENGINEER.findOne({
          where: { user_id: user_id, date: today },
          attributes: ["duty_started", "duty_ended"],
        });
        console.log(getWorkingHours.duty_started, getWorkingHours.duty_ended);
        quality_time_of_user = quality_time(
          getWorkingHours.duty_started,
          getWorkingHours.duty_ended
        );
        console.log(quality_time_of_user);
        if (
          quality_time_of_user !== null ||
          quality_time_of_user !== undefined
        ) {
          await TRACK_SITE_ENGINEER.update(
            { quality_hours: quality_time_of_user },
            {
              where: {
                user_id: user_id,
                date: today,
              },
            }
          );
        }
      }
    });
    res.status(200).json({
      code: 200,
      status: "success",
      message: "you have updated your status successfully",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }
};



// ==========================================SUPER ADMIN APIS=======================================================================

// create static reasons -> superAdmin API
exports.createReasons = async (req, res, next) => {
  const { reason_id, address, place_name, latitude, longitude } =
    req.body;
  try {
    if(reason_id !== 1 && reason_id !==2)
    {
      await StaticMovingOut.create(
        {
          reason_ID: reason_id, 
          address: address,
          place_name: place_name,
          latitude: latitude,
          longitude: longitude
        });
        res.status(200).json({
          code: 200,
          status: "success",
          message: "you have updated successfully",
        });
    }else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "reason_id cannot be 1 or 2",
    })}
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }
};

// create static reasons -> superAdmin API
exports.getSiteEnginnerDetails = async (req, res, next) => {
  const phone_number = req.body.phone_number;
  try {
    var data = await User.findOne({
      where: { user_name: phone_number },
      attributes: ["user_id", "current_site"],
    });
    // const token = createToken(re)
    if (data) {
      var details = await TRACK_SITE_ENGINEER.findAll({
        where: {
          user_id: data.user_id,
          current_site: data.current_site,
        },
        attributes: [
          "user_id",
          "date",
          "current_site",
          "duty_started",
          "duty_ended",
          "quality_hours",
          "current_site",
          "onduty_status",
          "moving_out_status",
          "start_reason_id"
        ],
      });
      if( details !== null){
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Documents fetched successfully",
          details
        });
      } else {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "No results found",
          result : {
            user_id: data.user_id,
            duty_status : 0
          }
        });
      }
      }else{
        es.status(200).json({
          code: 200,
          status: "success",
          message: "No results found",
          result : {
            user_id: data.user_id,
            duty_status : 0
          }
        });
      }
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }
};

// create table

// Create and Save
exports.create = (req, res) => {
  const result = StaticMovingOut.sequelize.sync();
  if (result) {
    res.status(200).json({
      code: 200,
      status: "success",
      message: "working",
      result: {},
    });
  }
};
