const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const multer = require("multer");
const userRouter = require("./user/routes");
const authRouter = require("./authorization/routes");
const messageRouter = require("./message/routes");

// https://socket.io/docs/v4/handling-cors/
require("dotenv").config();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // 127.0.0.1 is considered different from localhost here
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(authRouter);
app.use(messageRouter);
app.use(morgan("dev"));
app.use(express.static("uploads"));

const PORT = 3600;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

io.use((client, next) => {
  const userId = client.handshake.auth?.userId;

  if (!userId) {
    return next(new Error("Invalid user ID"));
  }

  client.userId = userId;
  next();
});

const userToSocketMap = {};
const clients = new Set();

io.on("connection", (client) => {
  console.log(`Client ${client.id} connected`);
  console.log(`User ${client.userId} connected`);

  clients.add(client.userId);

  userToSocketMap[client.userId] = client.id;

  io.emit("connect-response", Array.from(clients));

  /**
   * data: Message Object: {receiver, sender, files, text}
   */
  client.on("message", (data) => {
    const { receiver } = data;

    console.log("message");

    io.to(userToSocketMap[receiver]).emit("message-response", data);
  });

  client.on("disconnect", function () {
    clients.delete(client.userId);
    console.log("A user disconnected");
  });

  client.on("done-typing", ({ receiver, sender }) => {
    io.to(userToSocketMap[receiver]).emit("done-typing-response", sender);
    console.log(".");
  });

  client.on("typing", ({ receiver, sender }) => {
    io.to(userToSocketMap[receiver]).emit("typing-response", sender);
    console.log(".");
  });
});

app.get("/", (req, res) => {
  res.send("Smth");
});

httpServer.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
