const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PkFlEAGjI1JRUWvwLgQ6Ya0pW0wrj8ahsa39Vr3hantoOynuVRnAsfbOO2oGNRrlodg8VUTFCjexVyva1K0MmM400qBoo2FKW"
);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "Dustin",
    title: "Title",
  });
});

// app.post("/create-checkout-session", async (req, res) => {
//   const { priceId } = req.body;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price: priceId,
//         quantity: 1,
//       },
//     ],
//     mode: "subscription",
//     success_url: "https://your-app.com/success",
//     cancel_url: "https://your-app.com/cancel",
//   });

//   res.json({ id: session.id });
// });

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log("====================================");
  console.log("items:", items);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
