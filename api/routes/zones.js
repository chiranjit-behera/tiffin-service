const router = require('express').Router();
const Zone = require('../models/Zone');

// List all delivery zones
router.get('/', async (req, res, next) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    next(err);
  }
});

// Add new delivery zone
router.post('/', async (req, res, next) => {
  try {
    const { name, pincode } = req.body;
    const zone = new Zone({ name, pincode });
    await zone.save();
    res.status(201).json(zone);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
