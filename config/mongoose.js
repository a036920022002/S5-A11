const mongoose = require('mongoose');
require('dotenv').config();

const MY_ENV = process.env.MY_ENV;
mongoose.connect(MY_ENV, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('connect error');
});
db.once('open', () => {
  console.log('mongodb connected!!');
});

module.exports = db;
