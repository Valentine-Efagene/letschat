const UserModel = require("../../user/models/user.model");
const crypto = require("crypto");

exports.hasAuthValidFields = (req, res, next) => {
  let errors = {};

  if (req.body) {
    if (!req.body.email) {
      errors.email = "Missing email field";
    }
    if (!req.body.password) {
      errors.password = "Missing password field";
    }

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .json({ errors: { summary: "Validation Error", ...errors } });
    } else {
      return next();
    }
  } else {
    return res
      .status(400)
      .json({ errors: { summary: "Missing email and password fields" } });
  }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
  UserModel.findByEmail(req.body.email)
    .then((user) => {
      if (!user[0]) {
        res.status(404).json({ errors: { summary: "Not found" } });
      } else {
        let passwordFields = user[0].password.split("$");
        let salt = passwordFields[0];
        let hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            id: user[0]._id,
            email: user[0].email,
            permissionLevel: user[0].permissionLevel,
            provider: "email",
            name: user[0].firstName + " " + user[0].lastName,
          };

          return next();
        } else {
          return res
            .status(400)
            .json({ errors: { summary: "Invalid e-mail or password" } });
        }
      }
    })
    .catch((e) => {
      return res
        .status(500)
        .json({ errors: { summary: "Error while fetching user" } });
    });
};
