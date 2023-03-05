const UserModel = require("../models/user.model");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  UserModel.createUser(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};

exports.contacts = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  UserModel.contacts(req.params.id, limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.addContactById = (req, res) => {
  try {
    UserModel.addContactById(req.params.id, req.body.contactId).then(
      (result) => {
        res.status(200).send(result);
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.removeContactById = (req, res) => {
  try {
    UserModel.removeContactById(req.params.id, req.body.contactId).then(
      (result) => {
        res.status(200).send(result);
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  UserModel.list(limit, page).then((result) => {
    if (page < 0) {
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

exports.total = (req, res) => {
  UserModel.getTotal().then((result) => {
    // https://www.reddit.com/r/learnjavascript/comments/vowzmw/comment/iehnpgw/?utm_source=share&utm_medium=web2x&context=3
    // Explains the need for the string conversion
    res.status(200).send(String(result));
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.id).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

  //console.log({ body: req.body, file: req.file });

  try {
    if (req.file) {
      req.body.avatar = `${process.env.BASE_URL}/${req?.file?.filename}`;
    }

    UserModel.patchUser(req.params?.id, req.body).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.id).then((result) => {
    res.status(204).send({});
  });
};
