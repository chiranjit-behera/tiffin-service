const router = require('express').Router();
const Subscription = require('../models/Subscription');

// Get user's subscriptions
router.get('/:userId', async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId });
    res.json(subscriptions);
  } catch (err) {
    next(err);
  }
});

// Create new subscription
router.post('/', async (req, res, next) => {
  try {
    const { userId, plan, startDate, deliveryZone } = req.body;
    const subscription = new Subscription({ userId, plan, startDate, deliveryZone });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
