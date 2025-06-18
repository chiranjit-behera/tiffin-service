const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ENV = require("../config/env");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });
    if (!user.isAdmin) return res.status(403).json({ message: 'Admin access required' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
