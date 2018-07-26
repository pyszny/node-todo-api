const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove  -  removes multiple records
// Todo.remove({}) - removes everything from the collection

Todo.remove({}).then((result) => {
    console.log(result);
});

// Todo.findOneAndRemove

// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b5a0042ca7dfd181dcd3b39').then((todo) => {
    console.log(todo);
});

Todo.findOneAndRemove({_id: '5b5a0042ca7dfd181dcd3b38'}).then((todo) => {
    console.log(todo);
});
