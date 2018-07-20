let mongoose = require('mongoose');

mongoose.Promise = global.Promise;                                      // setting mongoose to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp');                  // setting mongoose db connection

module.exports = {mongoose};