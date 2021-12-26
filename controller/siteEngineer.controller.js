const db = require("../model");
const User = db.user;
const CustomerLocation = db.customerlocation;
const Reason = db.reason_SE;
const MovingOut = db.moving_out_SE;
const TRACK_SITE_ENGINEER = db.track_siteEngineer;
const StaticMovingOut = db.StaticMovingOut;
const SE_Quality_hours = db.SE_Quality_hours;
const jwt = require("jsonwebtoken");
const { createToken } = require("../middelware/authMiddleware");
const findDistance = require("../helper/distance");
const quality_time = require("../helper/calculate_quality");
const route_distance = require("../helper/google_distance");
const ist = require("../helper/indian_standard_time");
// const current_hour = require("../helper/current_time");

var hardware_shop = 0;
var rental_shop = 0;
// const current_hour = new Date();

// <===============================CONTROLLERS=======================================================>

// site_Engineer Login handled here
exports.login = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const { phone_number, password } = req.body;
  try {
    var result = await User.findOne({
      where: { user_name: phone_number, user_password: password },
      attributes: ["user_name", "user_password", "user_total_logins"],
    });
    console.log(result);
    // const token = createToken(result.user_name);
    if (result) {
      await User.update(
        {
          user_first_login: today,
          user_total_logins: result.user_total_logins + 1,
        },
        { where: { user_name: phone_number, user_password: password } }
      );
      res.status(200).json({
        code: 200,
        status: "success",
        message: "LoggedIn successfully",
        // result: {
        //   token: token,
        // },
      });
    } else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "Please check the login credentials",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "Please check the login credentials",
    });
  }
};

const hardware_shop_status = async (customer_id) => {
  var moving_out_response = await MovingOut.findAll({
    where: { Customer_ID: customer_id },
    attributes: ["reason_ID"],
  });

  // console.log("result type =>", typeof result);
  // console.log("result object =>", result);
  // console.log("result length =>", Object.keys(JSON.stringify(result)).length);

  const result_length = Object.keys(moving_out_response).length;

  // hardware shop logic
  if (result_length !== 0 || result_length !== null || result_length !== undefined) {
    if (result_length === 1 && result_length !== 0 && result_length !== null) {
      if (moving_out_response[0]["reason_ID"] === 2) {
        hardware_shop = 2;
        return true
      } else if (moving_out_response[0]["reason_ID"] === 1) {
        hardware_shop = 1;
        return true
      } else {
        hardware_shop = 0;
        return true
      }
    } else if (
      result_length === 2 &&
      result_length !== 0 &&
      result_length !== null
    ) {
      if (
        moving_out_response[0]["reason_ID"] === 2 ||
        moving_out_response[1]["reason_ID"] === 2
      ) {
        hardware_shop = 2;
        return true
      } else if (
        moving_out_response[0]["reason_ID"] === 1 ||
        moving_out_response[1]["reason_ID"] === 1
      ) {
        hardware_shop = 1;
        return true
      } else {
        hardware_shop = 0;
        return true
      }
    } else if (
      result_length === 3 &&
      result_length !== 0 &&
      result_length !== null
    ) {
      if (
        moving_out_response[0]["reason_ID"] === 2 ||
        moving_out_response[1]["reason_ID"] === 2 ||
        moving_out_response[2]["reason_ID"] === 2
      ) {
        hardware_shop = 2;
        return true
      } else if (
        moving_out_response[0]["reason_ID"] === 1 ||
        moving_out_response[1]["reason_ID"] === 1 ||
        moving_out_response[2]["reason_ID"] === 1
      ) {
        hardware_shop = 1;
        return true
      } else {
        hardware_shop = 0;
        return true
      }
    } else if (
      result_length === 4 &&
      result_length !== 0 &&
      result_length !== null
    ) {
      if (
        moving_out_response[0]["reason_ID"] === 2 ||
        moving_out_response[1]["reason_ID"] === 2 ||
        moving_out_response[2]["reason_ID"] === 2 ||
        moving_out_response[3]["reason_ID"] === 2
      ) {
        hardware_shop = 2;
        return true
      } else if (
        moving_out_response[0]["reason_ID"] === 1 ||
        moving_out_response[1]["reason_ID"] === 1 ||
        moving_out_response[2]["reason_ID"] === 1 ||
        moving_out_response[3]["reason_ID"] === 1
      ) {
        hardware_shop = 1;
        return true
      } else {
        hardware_shop = 0;
        return true
      }
    }
  } else {
    hardware_shop = 0;
    return true
  }
};

const rental_shop_status = async (customer_id) => {
  var moving_out_response = await MovingOut.findAll({
    where: { Customer_ID: customer_id },
    attributes: ["reason_ID"],
  });

  const result_length = Object.keys(moving_out_response).length;

  // rental shop logic
  if (result_length !== 0 || result_length !== null || result_length !== undefined) {
    if (result_length === 1 && result_length !== 0 && result_length !== null) {
      if (moving_out_response[0]["reason_ID"] === 4) {
        rental_shop = 4;
        return true
      } else if (moving_out_response[0]["reason_ID"] === 3) {
        rental_shop = 3;
        return true
      } else {
        rental_shop = 0;
        return true
      }
    } else if (
      result_length === 2 &&
      result_length !== 0 &&
      result_length !== null
    ) {
      if (
        moving_out_response[0]["reason_ID"] === 4 ||
        moving_out_response[1]["reason_ID"] === 4
      ) {
        rental_shop = 4;
        return true
      } else if (
        moving_out_response[0]["reason_ID"] === 3 ||
        moving_out_response[1]["reason_ID"] === 3
      ) {
        rental_shop = 3;
        return true
      } else {
        rental_shop = 0;
        return true
      }
    } else if (
      result_length === 3 &&
      result_length !== 0 &&
      result_length !== null
    ) {
      if (
        moving_out_response[0]["reason_ID"] === 4 ||
        moving_out_response[1]["reason_ID"] === 4 ||
        moving_out_response[2]["reason_ID"] === 4
      ) {
        rental_shop = 4;
        return true
      } else if (
        moving_out_response[0]["reason_ID"] === 3 ||
        moving_out_response[1]["reason_ID"] === 3 ||
        moving_out_response[2]["reason_ID"] === 3
      ) {
        rental_shop = 3;
        return true
      } else {
        rental_shop = 0;
        return true
      }
    } else if (
      result_length === 4 &&
      result_length !== 0 &&
      result_length !== null
    ) {
      if (
        moving_out_response[0]["reason_ID"] === 4 ||
        moving_out_response[1]["reason_ID"] === 4 ||
        moving_out_response[2]["reason_ID"] === 4 ||
        moving_out_response[3]["reason_ID"] === 4
      ) {
        rental_shop = 4;
        return true
      } else if (
        moving_out_response[0]["reason_ID"] === 3 ||
        moving_out_response[1]["reason_ID"] === 3 ||
        moving_out_response[2]["reason_ID"] === 3 ||
        moving_out_response[3]["reason_ID"] === 3
      ) {
        rental_shop = 3;
        return true
      } else {
        rental_shop = 0;
        return true
      }
    }
  } else {
    rental_shop = 0;
    return true
  }
};

// Retrieve all details from the database.
exports.getUserDetails = async (req, res, next) => {
  const today = ist();
  const phone_number = req.body.phone_number;
  try {
    var data = await User.findOne({
      where: { user_name: phone_number },
      attributes: ["user_id", "current_site", "tag_my_location_status"],
    });
    if (data) {
      var data1 = await CustomerLocation.findOne({
        where: { customer_ID: data.current_site },
        attributes: ["latitude", "longitude", "radius"],
      });
      if (data1) {
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
        if (details !== null) {
          await hardware_shop_status(data.current_site);
          await rental_shop_status(data.current_site);
          // console.log("HSS type", typeof HSS);
          // console.log("HSS data",  HSS);
          // console.log("RSS type", typeof RSS);
          // console.log("RSS data",  RSS);
          
            result = {
              user_id: details.user_id,
              current_site: details.current_site,
              current_moving_out_status: details.moving_out_status,
              duty_status: details.onduty_status,
              reason_id: details.start_reason_id,
              tag_my_location_status: data.tag_my_location_status,
              currentSite_latitude: data1.latitude,
              currentSite_longitude: data1.longitude,
              currentSite_radius: data1.radius,
              hardware_shop: hardware_shop,
              rental_shop: rental_shop,
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
            message: "you are off duty now",
            result: {
              user_id: data.user_id,
              duty_status: 0,
            },
          });
        }
      } else {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "you are off duty now",
          result: {
            user_id: data.user_id,
            duty_status: 0,
          },
        });
      }
    } else {
      es.status(200).json({
        code: 200,
        status: "success",
        message: "you are off duty now",
        result: {
          user_id: data.user_id,
          duty_status: 0,
        },
      });
    }
    // const token = createToken(re)
  } catch (err) {
    res.json({
      status: "error",
      message: "no documents found for this user",
    });
  }
};

// onduty API handled here
exports.onDuty = async (req, res, next) => {
  const { user_id, latitude, longitude } = req.body;
  // const date = new Date();
  const today = ist();
  console.log(today);

  try {
    var find_current_site_of_employee = await User.findOne({
      where: { user_id: user_id },
      attributes: ["current_site"],
    });
    if (find_current_site_of_employee !== null) {
      var index_check = await TRACK_SITE_ENGINEER.count({
        where: { user_id: user_id, date: today },
      });
      console.log("index->", index_check);
      if (index_check === 0) {
        await TRACK_SITE_ENGINEER.create({
          onduty_status: 1,
          user_id: user_id,
          current_site: find_current_site_of_employee.current_site,
          onduty_status: 1,
          date: today,
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
    } else {
      res.json({
        status: "error",
        message: "unknown error found from server side",
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
  const customer_id = req.body.customer_id;
  try {
    var dynamic_reasons = await MovingOut.findAll({
      where: { Customer_ID: customer_id },
      attributes: ["reason_ID", "main_reason", "sub_reason"],
    });
    // console.log("dynamic_reason=>",dynamic_reasons);
    // with dynamic reasons
    if (dynamic_reasons !== null || dynamic_reasons !== undefined) {
      var static_reasons = await Reason.findAll({
        attributes: ["reason_ID", "main_reason", "sub_reason"],
      });
      // const token = createToken(re)
      if (static_reasons) {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Documents fetched successfully",
          result: {
            reasons: [...dynamic_reasons, ...static_reasons],
          },
        });
      } else {
        res.status(200).json({
          code: 401,
          status: "failure",
          message: "No results found",
        });
      }
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
  const today = ist();
  // const today_utc = new Date().toUTCString().split("T")[0];
  console.log("ist =>", today);
  const {
    user_id,
    reason_id,
    customer_id,
    stage,
    latitude,
    longitude,
    radius,
  } = req.body;

  // stage 1 select reasons
  if (stage === 0) {
    try {
      const current_hour = new Date();
      var result = await TRACK_SITE_ENGINEER.update(
        {
          start_reason_id: reason_id,
          moving_out_status: 1,
          moving_out_time: current_hour,
        },
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
      if (reason_id <= 4) {
        var result = await MovingOut.findOne({
          where: { reason_ID: reason_id, Customer_ID: customer_id },
          attributes: ["latitude", "longitude"],
        });
        if (result) {
          var latitude2 = result["latitude"];
          var longitude2 = result["longitude"];
          distance_btw_employee_and_site =
            findDistance(latitude, longitude, latitude2, longitude2) * 1000;
          if (distance_btw_employee_and_site > radius) {
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
            // using google distance matrix api to calculate distance travelled
            route_distance(user_id, latitude, longitude, latitude2, longitude2);
            res.status(200).json({
              code: 200,
              status: "success",
              message: "site engineer reached the place successfully",
            });
          }
        } else {
          res.status(200).json({
            code: 201,
            status: "failure",
            message: "Please save locations for this site",
          });
        }
      } else {
        var result = await StaticMovingOut.findOne({
          where: { reason_ID: reason_id },
          attributes: ["latitude", "longitude"],
        });
        if (result) {
          distance_btw_employee_and_site =
            findDistance(latitude, longitude, latitude2, longitude2) * 1000;
          if (distance_btw_employee_and_site > radius) {
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
            // using google distance matrix api to calculate distance travelled
            route_distance(user_id, latitude, longitude, latitude2, longitude2);
            res.status(200).json({
              code: 200,
              status: "success",
              message: "site engineer reached the place successfully",
            });
          }
        } else {
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
      // using google distance matrix api to calculate distance travelled
      route_distance(user_id, latitude, longitude, latitude2, longitude2);
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
      if (reason_id <= 4) {
        var result = await MovingOut.findOne({
          where: { reason_ID: reason_id, Customer_ID: customer_id },
          attributes: ["latitude", "longitude"],
        });
        if (result) {
          var latitude2 = result["latitude"];
          var longitude2 = result["longitude"];
          distance_btw_employee_and_site =
            findDistance(latitude, longitude, latitude2, longitude2) * 1000;
          if (distance_btw_employee_and_site > radius) {
            res.status(200).json({
              code: 401,
              status: "failure",
              message:
                "your are not in the radius please move forward and try again",
            });
          } else {
            var result = await TRACK_SITE_ENGINEER.update(
              { moving_out_status: 0 },
              { where: { user_id: user_id, date: today } }
            );
            // using google distance matrix api to calculate distance travelled
            route_distance(user_id, latitude, longitude, latitude2, longitude2);
            res.status(200).json({
              code: 200,
              status: "success",
              message: "site engineer reached the place successfully",
            });
          }
        } else {
          res.status(200).json({
            code: 201,
            status: "failure",
            message: "Please save locations for this site",
          });
        }
      } else {
        var result = await StaticMovingOut.findOne({
          where: { reason_ID: reason_id },
          attributes: ["latitude", "longitude"],
        });
        if (result) {
          distance_btw_employee_and_site =
            findDistance(latitude, longitude, latitude2, longitude2) * 1000;
          if (distance_btw_employee_and_site > radius) {
            res.status(200).json({
              code: 401,
              status: "failure",
              message:
                "your are not in the radius please move forward and try again",
            });
          } else {
            var result = await TRACK_SITE_ENGINEER.update(
              { moving_out_status: 0 },
              { where: { user_id: user_id, date: today } }
            );
            // using google distance matrix api to calculate distance travelled
            route_distance(user_id, latitude, longitude, latitude2, longitude2);
            res.status(200).json({
              code: 200,
              status: "success",
              message: "site engineer reached the place successfully",
            });
          }
        } else {
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
};

// Tag my location handled here
exports.TagMyLocation = async (req, res, next) => {
  const { reason_id, customer_id, address, place_name, latitude, longitude } =
    req.body;
  // console.log("param->", reason_id, customer_id, address, place_name, latitude, longitude );
  try {
    if (reason_id <= 4) {
      const index = await MovingOut.count({
        where: { Customer_ID: customer_id },
      });
      if (index < 4) {
        // const HSS = hardware_shop_status(customer_id);
        // const RSS = rental_shop_status(customer_id);
        // console.log("RSS",rental_shop_status(customer_id));
        var result = await MovingOut.create({
          reason_ID: reason_id,
          Customer_ID: customer_id,
          address: address,
          main_reason: place_name,
          latitude: latitude,
          longitude: longitude,
        });
        if (result) {
          if (index === 3) {
            var update_tag_status = await User.update(
              { tag_my_location_status: 1 },
              { where: { current_site: customer_id } }
            );
            console.log(update_tag_status);
            res.status(200).json({
              code: 200,
              status: "success",
              message: "details updated successfully",
            });
          } else if (index <= 2) {
            res.status(200).json({
              code: 200,
              status: "success",
              message: "details updated successfully",
            });
          } else if (index >= 4) {
            res.status(200).json({
              code: 200,
              status: "success",
              message: "tag my location for this site is already updated",
            });
          }
        } else {
          res.status(200).json({
            code: 401,
            status: "failure",
            message: `customer_ID ${customer_id} is not available`,
          });
        }
      } else {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "tag my location for this site is already updated",
        });
      }
    } else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "reason_id should be less than 4",
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
  const today = ist();
  const { user_id, customer_id, latitude, longitude } = req.body;
  try {
    await TRACK_SITE_ENGINEER.update(
      { onduty_status: 0 },
      {
        where: {
          user_id: user_id,
          date: today,
        },
      }
    );
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

// CheckIn handled here
exports.checkIn = async (req, res, next) => {
  const today = ist();
  const current_hour = new Date();
  const { user_id } = req.body;
  try {
    await TRACK_SITE_ENGINEER.update(
      { duty_started: current_hour },
      {
        where: {
          user_id: user_id,
          date: today,
        },
      }
    ).then(async function (result) {
      res.status(200).json({
        code: 200,
        status: "success",
        message: "you have updated your status successfully",
      });
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "unknown error found from server side",
    });
  }
};

// checkOut handled here
exports.checkout = async (req, res, next) => {
  const today = ist();
  const current_hour = new Date();
  const { user_id } = req.body;
  try {
    await TRACK_SITE_ENGINEER.update(
      { duty_ended: current_hour },
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
          attributes: ["duty_started", "duty_ended", "quality_hours"],
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
            {
              quality_hours:
                quality_time_of_user + getWorkingHours.quality_hours,
            },
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
  const { reason_id, address, place_name, latitude, longitude } = req.body;
  try {
    if (reason_id !== 1 && reason_id !== 2) {
      await StaticMovingOut.create({
        reason_ID: reason_id,
        address: address,
        place_name: place_name,
        latitude: latitude,
        longitude: longitude,
      });
      res.status(200).json({
        code: 200,
        status: "success",
        message: "you have updated successfully",
      });
    } else {
      res.status(200).json({
        code: 401,
        status: "failure",
        message: "reason_id cannot be 1 or 2",
      });
    }
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
          "moving_out_time",
          "start_reason_id",
          "total_distance_travelled",
        ],
      });
      if (details !== null) {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Documents fetched successfully",
          details,
        });
      } else {
        res.status(200).json({
          code: 200,
          status: "success",
          message: "No results found",
          result: {
            user_id: data.user_id,
            duty_status: 0,
          },
        });
      }
    } else {
      es.status(200).json({
        code: 200,
        status: "success",
        message: "No results found",
        result: {
          user_id: data.user_id,
          duty_status: 0,
        },
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
  const result = TRACK_SITE_ENGINEER.sequelize.sync();
  if (result) {
    res.status(200).json({
      code: 200,
      status: "success",
      message: "working",
      result: {},
    });
  }
};
