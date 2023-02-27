const jwt = require("jsonwebtoken"),
  secret = require("../config/env.config")["jwt_secret"];
const ADMIN_PERMISSION = require("../config/env.config")["permissionLevels"][
  "ADMIN"
];

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    //let id = req.jwt.id;

    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  let user_permission_level = parseInt(req.jwt.permissionLevel);
  let id = req.jwt.id;
  if (req.params && req.params.id && id === req.params.id) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
};

exports.sameUserCantDoThisAction = (req, res, next) => {
  let id = req.jwt.id;
  if (req.params.id !== id) {
    return next();
  } else {
    return res.status(400).send();
  }
};
