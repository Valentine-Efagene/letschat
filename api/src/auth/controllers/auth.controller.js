jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uuid = require("uuid");

const jwtSecret = process.env.JWT_SECRET;

exports.login = (req, res) => {
  try {
    let refreshId = req.body.id + jwtSecret;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret); // Error
    let b = Buffer.from(hash);
    let refresh_token = b.toString("base64");
    res.status(201).json({
      accessToken: token,
      refreshToken: refresh_token,
      id: req.body.id,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ errors: err });
  }
};

exports.refresh_token = (req, res) => {
  try {
    req.body = req.jwt;
    let token = jwt.sign(req.body, jwtSecret);
    res.status(201).json({ id: token });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};
