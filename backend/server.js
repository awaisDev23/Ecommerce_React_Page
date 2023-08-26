const express = require("express");
const stripe = require("stripe")(
  "Ypk_test_51NdRuiHXG7QNx5Yv8WBWg91rersvUU8aMwIdMKAByWWz4uSgyYfzE5G6eUc2yvVioYwIrYQSD5ACF3delI6nUczv006yXMZuqA"
);

const app = express();

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating PaymentIntent." });
  }
});

const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
