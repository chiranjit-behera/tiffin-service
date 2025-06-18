const router = require('express').Router();
const Menu = require('../models/Menu');

// Get full weekly menu
router.get('/', async (req, res, next) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    next(err);
  }
});

// Admin: Add or update a day's menu
router.post('/', async (req, res, next) => {
  try {
    const { day, meals } = req.body;
    let menu = await Menu.findOne({ day });
    if (menu) {
      menu.meals = meals;
      await menu.save();
    } else {
      menu = new Menu({ day, meals });
      await menu.save();
    }
    res.json({ message: 'Menu saved successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
