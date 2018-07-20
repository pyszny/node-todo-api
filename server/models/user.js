const mongoose = require('mongoose');

let User = mongoose.model('Users', {
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    }
});

// let user = new User({
//     email: ' maciek@node.pl '
// });
//
// user.save().then((doc) => {
//     console.log(`User saved: ${user.email}`, doc);
// }, (e) => {
//     console.log('An error occured', e);
// });
//
// module.exports = {User};