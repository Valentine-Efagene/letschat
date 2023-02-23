const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const multer = require("multer");
const userRouter = require("./users/routes");
const authRouter = require("./authorization/routes");
require("dotenv").config();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);

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

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.send("Smth");
});

server.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
