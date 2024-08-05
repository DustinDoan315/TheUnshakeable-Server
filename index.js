const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIO = require("socket.io");
const paymentRoutes = require("./routes/paymentRoutes");
const { PORT, CORS_ORIGIN } = require("./config");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", paymentRoutes);

const generateID = () => Math.random().toString(36).substring(2, 10);

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
