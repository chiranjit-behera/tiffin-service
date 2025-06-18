// const mongoose = require('mongoose');

// const menuSchema = new mongoose.Schema({
//   day: String,
//   meals: [{
//     type: { type: String, enum: ['veg', 'non-veg'], required: true },
//     name: String,
//     price: Number,
//     description: String
//   }]
// });

// module.exports = mongoose.model('Menu', menuSchema);








/*   */




const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: String,
  description: String
});

const MealSchema = new mongoose.Schema({
  type: { type: String, enum: ['veg', 'non-veg'], required: true },
  time: { type: String, enum: ['lunch', 'dinner'], required: true },
  items: [DishSchema],
  price: { type: Number, required: true }
});

const MenuSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  meals: [MealSchema]
});

module.exports = mongoose.model('Menu', MenuSchema);




/*     */



// const mongoose = require('mongoose');

// const mealSchema = new mongoose.Schema({
//   category: {
//     type: String,
//     enum: ['lunch', 'dinner'],
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['veg', 'non-veg'],
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   description: String
// });

// const menuSchema = new mongoose.Schema({
//   day: {
//     type: String,
//     required: true,
//     enum: [
//       'Monday', 'Tuesday', 'Wednesday', 'Thursday',
//       'Friday', 'Saturday', 'Sunday'
//     ]
//   },
//   meals: {
//     type: [mealSchema],
//     validate: {
//       validator: function (v) {
//         // Ensure one lunch and one dinner
//         const categories = v.map(meal => meal.category);
//         return categories.includes('lunch') && categories.includes('dinner');
//       },
//       message: 'Each day must have both a lunch and dinner meal.'
//     }
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Menu', menuSchema);
