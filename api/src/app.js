const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const morgan = require("morgan");
const multer = require("multer");
const userRouter = require("./users/routes");
const authRouter = require("./authorization/routes");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(authRouter);
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

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.send("Smth");
});

server.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
