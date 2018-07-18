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

    // findOneAndUpdate                                                             // http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b4e4beb42c7a678231a8645')
    // }, {
    //     $set: {                                                                     // https://docs.mongodb.com/manual/reference/operator/update/
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b4e4beb42c7a678231a8647')
    }, {
        $set: {
            name: 'Maciek'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
       console.log(result);
    });

    // client.close();
});