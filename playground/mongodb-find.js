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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b4e4beb42c7a678231a8645')    //returns object instance
    // }).toArray().then((docs) => {                        //find() - points collection, toArray creates array of objects and returns promise => then(docs)
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Maciek'}).toArray().then((docs) => {
        console.log(`Todos with name Maciek:`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // client.close();
});