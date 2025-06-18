const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const zoneRoutes = require('./routes/zones');
const subscriptionRoutes = require('./routes/subscription');
const paymentRoutes = require('./routes/payment');
const errorHandler = require('./middleware/errorHandler');
const adminRoutes = require('./routes/admin');
const job = require("./config/cron");
const ENV = require("./config/env");

dotenv.config();
const app = express();

if (ENV.NODE_ENV === "production") job.start();

app.use(cors());
app.use(express.json());

mongoose.connect(ENV.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req,res)=>{
  res.status(200).json({"message": "success"})
})

app.use(errorHandler);

const PORT = ENV.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
