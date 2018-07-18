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

    //deleteMany                                                                    //deletes all items that matches the criteria
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne                                                                     //deletes first item that matches the criteria
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name: 'Maciek'});

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b4e6004857b3c06993174cd')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });


    // client.close();
});