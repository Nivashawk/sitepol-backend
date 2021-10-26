const jwt = require("jsonwebtoken");

// creating jwt token
const maxTime = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret key", {
    expiresIn: maxTime,
  });
};

// verifing jwt token
const requireAuth = (req, res, next) => {
  const Auth = req.header("authorization");
  if (Auth != undefined) {
    const token = Auth.split(" ");
    console.log(token[1]);

    if (token) {
      jwt.verify(token[1], "secret key", (err) => {
        if (err) {
          console.log(err.message);
          res.status(200).json({
            code: 400,
            status: "Authorization error",
            message: err.message,
          });
        } else {
          next();
        }
      });
    }
  } else {
    res.status(200).json({
      code: 400,
      status: "Authorization error",
      message: "Authorization token missing in request",
    });
  }
};

module.exports = { createToken, requireAuth };
