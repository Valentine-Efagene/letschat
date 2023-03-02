const MessageModel = require("../models/message.model");

exports.insert = (req, res) => {
  MessageModel.createMessage(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
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

  MessageModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.listByUser = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  MessageModel.list(limit, page, req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  MessageModel.findById(req.params.id).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = async (req, res) => {
  try {
    req.body.avatar = req?.file?.filename;

    MessageModel.patchMessage(req.params.id, req.body).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.removeById = (req, res) => {
  MessageModel.removeById(req.params.id).then((result) => {
    res.status(204).send({});
  });
};
