const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {                       // setting route for GET method
    let id = req.params.id;                                 // variable id stores requested value (:id)
    if(!ObjectID.isValid(id)) {                             // checks if passed value is not valid ID
        return res.status(404).send();                      // if is not return 404 response
    }
    Todo.findById(id).then((todo) => {                      //
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});


module.exports = {app};


