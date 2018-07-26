// const expect = require('expect');
// const request = require('supertest');
// const {ObjectID} = require('mongodb');
//
// const {app} = require('./../server');
// const {Todo} = require('./../models/todo');
//
// const todos = [{
//     _id: new ObjectID(),
//     text: 'First test todo'
// }, {
//     _id: new ObjectID(),
//     text: 'Second test todo'
// }];
//
// beforeEach((done) => {
//     Todo.remove({}).then(() => {                        //removes all todos before every test
//         return Todo.insertMany(todos);
//     }).then(() => done());
// });
//
// describe('POST /todos', () => {
//     it('should create a new todo', (done) => {
//         let text = 'Test todo text';
//
//         request(app)
//             .post('/todos')
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if(err) {
//                     return done(err);                               // stops function and passes occured error to done
//                 }
//
//                 Todo.find({text}).then((todos) => {                       //gets all todos with {text} value
//                     expect(todos.length).toBe(1);                   //should be 1 todo in db
//                     expect(todos[0].text).toBe(text);               //expexts todo text value to be type text
//                     done();
//                 }).catch((e) => done(e));
//             });
//
//     });
//
//     it('should not create todo with invalid body data', (done) => {
//         request(app)                                                //passing app to supertest
//             .post('/todos')                                         //post request with todos path
//             .send({})                                               //sending empty object
//             .expect(400)
//             .end((err, res) => {
//                 if(err) {
//                     return done(err);
//                 }
//
//                 Todo.find().then((todos) => {                       //fetches all todos inside collection
//                     expect(todos.length).toBe(2);                   //expects 0 todos in db
//                     done();
//                 }).catch((e) => done(e));                           //catches error and passes it into done
//             });
//     });
// });
//
// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });
//
// describe('GET /todos/:id', () => {
//     it('should return todo doc', (done) => {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .expect(200)
//             .expect((res) => {
//                expect(res.body.todo.text).toBe(todos[0].text);
//             })
//             .end(done);
//     });
//
//     it('should return 404 if todo not found', (done) => {
//         request(app)
//             .get(new ObjectID().toHexString())
//             .expect(404)
//             .end(done);
//     });
//
//     it('should return 404 for non-object ids', (done) => {
//         request(app)
//             .get('/todos/123')
//             .expect(404)
//             .end(done);
//     });
// });
