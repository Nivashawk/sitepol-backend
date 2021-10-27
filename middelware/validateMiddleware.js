const validator = require("../helper/validate");

// validation for Login
const login = (req, res, next) => {
  const validationRule = {
    phone_number: "required|integer",
    password: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        code: 412,
        status: "failure",
        message: "validation error",
        err
      });
    } else {
      next();
    }
  });
};

// validation for Onduty
const onduty = (req, res, next) => {
    const validationRule = {
        user_id: "required|integer",
        latitude: "required|string",
        longitude: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          code: 412,
          status: "failure",
          message: "validation error",
          err
        });
      } else {
        next();
      }
    });
  };

  // validation for movingoutstage1
const movingoutStage1 = (req, res, next) => {
    const validationRule = {
        user_id: "required|integer",
        reason_id: "required|integer",
        customer_id: "required|integer",
        stage: "required|integer",
        latitude: "required|string",
        longitude: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          code: 412,
          status: "failure",
          message: "validation error",
          err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  login,
  onduty,
  movingoutStage1
};
