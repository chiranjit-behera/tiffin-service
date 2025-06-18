const router = require('express').Router();

// Mock payment success endpoint
router.post('/checkout', async (req, res) => {
  // Integrate Razorpay/Stripe logic here
  res.status(200).json({ message: "Payment successful", transactionId: "mock123" });
});

module.exports = router;
