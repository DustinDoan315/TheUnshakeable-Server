const stripe = require("../stripeClient");

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

const createPaymentIntent = async (req, res) => {
  const { items } = req.body;
  console.log("====================================");
  console.log("items:", items);
  try {
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
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const paymentSheet = async (req, res) => {
  try {
    const { currency } = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-06-20" }
    );
    let paymentMethods;
    if (currency === "eur") {
      paymentMethods = ["bancontact", "card", "ideal", "sepa_debit"];
    } else if (currency === "usd") {
      paymentMethods = ["card", "klarna"];
    } else {
      throw new Error("Unsupported currency");
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: currency,
      customer: customer.id,
      payment_method_types: paymentMethods,
    });
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51PkFlEAGjI1JRUWvByNDVvlwiqEE3JvNRTInlb8Vf2bRk0nSwWMEFWmDzDSK6szP25E0WslkSXqnbar3J2Znydfa00lhxBzMHG",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  paymentSheet,
};
