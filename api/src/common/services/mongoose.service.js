const mongoose = require("mongoose");
let count = 0;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  mongoose
    .connect(process.env.MONGODB_URL, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count
      );
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;
