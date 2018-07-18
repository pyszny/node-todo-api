// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let user = {name: "Maciek", age: 26};                                               //create object user
// let {name} = user;                                                                  //destructure the object and create new variable
// console.log(name);                                                                  //

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {         //(db location, callback)
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');                                                //database reference

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));                   //returns JSON-like view od recived data
    // });

    // db.collection('Users').insertOne({                                              //creates a collection to pass data to
    //     name: 'Maciek',
    //     age: 26,
    //     location: 'Warsaw'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());                                                    //ops contains the documents inserted with added _id fields
    //
        client.close();                                                             //closes connection
    // });
});