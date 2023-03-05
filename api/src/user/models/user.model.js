const mongoose = require("../../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
  contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.findById = function (cb) {
  return this.model("User").find({ id: this.id }, cb);
};

const User = mongoose.model("User", userSchema);

exports.findByEmail = (email) => {
  return User.find({ email: email }); //.populate("contacts");
};

exports.findById = (id) => {
  return (
    User.findById(id)
      //.populate("contacts")
      .then((result) => {
        if (result == null) return null;

        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
      })
  );
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
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

exports.contacts = async (id) => {
  const user = await User.findById(id).populate("contacts");
  return user?.contacts;
};

exports.getTotal = async () => {
  return await User.countDocuments();
};

exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    userData,
    {
      returnOriginal: false,
    }
  );
};

exports.addContactById = (id, contactId) => {
  return User.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        contacts: contactId,
      },
    },
    {
      returnOriginal: false,
    }
  );
};

exports.removeContactById = (id, contactId) => {
  return User.findByIdAndUpdate(
    id,
    {
      $pull: {
        contacts: contactId,
      },
    },
    {
      returnOriginal: false,
    }
  );
};

exports.removeContactById = (id, contactId) => {
  return User.findByIdAndUpdate(
    id,
    {
      $pull: {
        contacts: contactId,
      },
    },
    {
      returnOriginal: false,
    }
  );
};

exports.removeById = (id) => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
