const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const morgan = require("morgan");
const multer = require("multer");
const userRouter = require("./user/routes");
const authRouter = require("./authorization/routes");
const messageRouter = require("./message/routes");
const MessageModel = require("./message/models/message.model");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(authRouter);
app.use(messageRouter);
app.use(morgan("dev"));
app.use(express.static("uploads"));

const PORT = 3000;

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

  io.emit("connect-response", clients);

  client.on("message", (data) => {
    const { receiver } = data;

    io.to(userToSocketMap[receiver]).emit("message-response", data);
  });

  client.on("disconnect", function () {
    clients.delete(client.userId);
    console.log("A user disconnected");
  });

  client.on("done-typing", (data) => {
    client.broadcast.emit("done-typing-response", data);
    //client.broadcast.emit("typing-response", data);
    console.log(".");
  });

  client.on("typing", (data) => {
    client.broadcast.emit("typing-response", data);
    //client.broadcast.emit("typing-response", data);
    console.log(".");
  });
});

app.get("/", (req, res) => {
  res.send("Smth");
});

server.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
