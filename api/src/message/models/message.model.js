const mongoose = require("../../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  receiver: String,
  ref: String,
  text: String,
  //images: [String],
  files: [{ path: String, mimeType: String, size: Number }],
  created_at: { type: Date, default: Date.now },
});

messageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
messageSchema.set("toJSON", {
  virtuals: true,
});

exports.getCount = async (userId, contactId) => {
  return await Message.countDocuments({
    $or: [
      { sender: userId, receiver: contactId },
      { sender: contactId, receiver: userId },
    ],
  });
};

exports.getLastMessages = async (contacts) => {
  const promises = contacts.map(async (contactId) => {
    return await Message.findOne({
      $or: [{ sender: contactId }, { receiver: contactId }],
    })
      .sort({ created_at: -1 })
      .limit(1);
  });

  const messages = await Promise.all(promises);
  return messages;
};

messageSchema.findById = function (cb) {
  return this.model("Message").find({ id: this.id }, cb);
};

const Message = mongoose.model("Message", messageSchema);

exports.findById = async (id) => {
  return await Message.findById(id).then((result) => {
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

/*
exports.listByUser = (perPage, page, userId) => {
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
*/

/**
 *
 * @param {*} perPage
 * @param {number} page: Must be >= 1
 * @param {*} senderId
 * @param {*} receiverId
 * @returns
 */
exports.listBySenderReceiver = (perPage, page, senderId, receiverId) => {
  return new Promise((resolve, reject) => {
    //console.table({ perPage, page, skip: perPage * page });
    Message.find()
      .or([
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ])
      .limit(perPage)
      .skip(perPage * (page - 1))
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
