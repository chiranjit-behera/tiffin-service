const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: { type: String, enum: ['weekly', 'monthly'] },
  startDate: Date,
  deliveryZone: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
