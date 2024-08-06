const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");
const { PORT } = require("./config");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", paymentRoutes);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
