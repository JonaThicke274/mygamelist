const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || /** INSERT URL here -> **/'', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
