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

  // validation for Offduty
const offduty = (req, res, next) => {
  const validationRule = {
    user_id: "required|integer",
    customer_id: "required|integer",
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


   // validation for tagMyLocation
const tagLocation = (req, res, next) => {
  const validationRule = {
      reason_id: "required|integer",
      customer_id: "required|integer",
      place_name: "required|string",
      address: "required|string",
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

 // validation for tagMyLocation
 const getdetails = (req, res, next) => {
  const validationRule = {
      phone_number: "required|integer",
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
  offduty,
  movingoutStage1,
  tagLocation,
  getdetails
};
