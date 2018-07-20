const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());                             // takes json and converts it to an object

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);                                  // sending response to value of doc
    }, (e) => {
        res.status(400).send(e);                                    // sends error back
    })
});

app.listen(3007, () => {
    console.log('Server started');
});


