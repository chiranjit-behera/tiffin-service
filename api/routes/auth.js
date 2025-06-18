const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ENV = require("../config/env");

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Weak password.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered.' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
