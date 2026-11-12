
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Test backend connection
app.get("/", (req, res) => {
  res.json({ message: "Grocery App Payment API is running" });
});

// Create Razorpay order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay keys are not configured" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `grocery_${Date.now()}`,
    });

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Unable to create payment order" });
  }
});

// Verify Razorpay payment
app.post("/api/payment/verify", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expected = Buffer.from(generatedSignature);
    const received = Buffer.from(razorpay_signature);

    const isValid =
      expected.length === received.length &&
      crypto.timingSafeEqual(expected, received);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Verification error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Grocery Payment API running on port ${PORT}`);
});
