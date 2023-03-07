const MessageModel = require("../models/message.model");

exports.insert = (req, res) => {
  if (req.files) {
    // req.body.images = req.files.map(
    //   (img) => `${process.env.BASE_URL}/${img.filename}`
    // );
    req.body.files = req.files.map(({ filename, mimetype, size }) => ({
      path: `${process.env.BASE_URL}/${filename}`,
      mimeType: mimetype,
      size,
    }));
  }

  MessageModel.createMessage(req.body).then((result) => {
    res.status(201).send(result);
  });
};

exports.count = (req, res) => {
  MessageModel.getCount(req.params.userId, req.params.contactId).then(
    (result) => {
      // https://www.reddit.com/r/learnjavascript/comments/vowzmw/comment/iehnpgw/?utm_source=share&utm_medium=web2x&context=3
      // Explains the need for the string conversion
      res.status(200).send(String(result));
    }
  );
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

exports.listBySenderReceiver = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  const { senderId, receiverId } = req.params;

  MessageModel.listBySenderReceiver(limit, page, senderId, receiverId).then(
    (result) => {
      res.status(200).send(result);
    }
  );
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
