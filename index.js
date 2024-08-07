const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerSetup = require("./swagger");

const { PORT } = require("./config");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

swaggerSetup(app);
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api", paymentRoutes);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
