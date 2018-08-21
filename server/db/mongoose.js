let mongoose = require('mongoose');

mongoose.Promise = global.Promise;                                      // setting mongoose to use promises
mongoose.connect(process.env.MONGODB_URI);                  // setting mongoose db connection

module.exports = {mongoose};