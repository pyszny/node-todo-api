const {User} = require('./../models/user');

let authenticate = (req, res, next) => {        //middleware
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();                       //until next() gets called rest of function will not be executed
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};