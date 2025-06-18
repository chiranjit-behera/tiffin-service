const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: String,
  pincode: [String]
});

module.exports = mongoose.model('Zone', zoneSchema);
