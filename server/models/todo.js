const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {                                     // create new Todo model
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// let newTodo = new Todo({
//     text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo', e)
// });
//
module.exports = {Todo};