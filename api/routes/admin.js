const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Menu = require('../models/Menu');
const Zone = require('../models/Zone');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

router.use(adminAuth);

// MENU CRUD
router.get('/menu', async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

router.post('/menu', async (req, res) => {
  // req.body: { day, meals: [{ type, name, price, description }] }
  const newMenu = new Menu(req.body);
  await newMenu.save();
  res.json(newMenu);
});

router.put('/menu/:id', async (req, res) => {
  const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedMenu);
});

router.delete('/menu/:id', async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: 'Menu deleted' });
});

// ZONES CRUD
router.get('/zones', async (req, res) => {
  const zones = await Zone.find();
  res.json(zones);
});

router.post('/zones', async (req, res) => {
  const newZone = new Zone(req.body);
  await newZone.save();
  res.json(newZone);
});

router.put('/zones/:id', async (req, res) => {
  const updatedZone = await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedZone);
});

router.delete('/zones/:id', async (req, res) => {
  await Zone.findByIdAndDelete(req.params.id);
  res.json({ message: 'Zone deleted' });
});

// USERS LIST & DELETE (no password in response)
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// SUBSCRIPTIONS LIST & DELETE
router.get('/subscriptions', async (req, res) => {
  const subscriptions = await Subscription.find().populate('userId', 'name email');
  res.json(subscriptions);
});

router.delete('/subscriptions/:id', async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.json({ message: 'Subscription deleted' });
});

module.exports = router;
