const mongoose = require("../../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  receiver: String,
  ref: String,
  text: String,
  images: String,
});

messageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
messageSchema.set("toJSON", {
  virtuals: true,
});

messageSchema.findById = function (cb) {
  return this.model("Message").find({ id: this.id }, cb);
};

const Message = mongoose.model("Message", messageSchema);

exports.findById = (id) => {
  return Message.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.createMessage = (messageData) => {
  const message = new Message(messageData);
  return message.save();
};

exports.listByUser = (perPage, page, userId) => {
  console.log({ userId });
  return new Promise((resolve, reject) => {
    Message.find()
      .or([{ sender: userId }, { receiver: userId }])
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.listBySenderReceiver = (perPage, page, senderId, receiverId) => {
  return new Promise((resolve, reject) => {
    Message.find()
      .or([
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ])
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Message.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.patchMessage = (id, messageData) => {
  return Message.findOneAndUpdate(
    {
      _id: id,
    },
    messageData
  );
};

exports.removeById = (messageId) => {
  return new Promise((resolve, reject) => {
    Message.deleteMany({ _id: messageId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
