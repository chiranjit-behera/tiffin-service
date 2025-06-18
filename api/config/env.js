var dotenv = require('dotenv');
dotenv.config();

var ENV = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = ENV;
