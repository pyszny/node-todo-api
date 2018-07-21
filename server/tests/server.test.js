const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());                             //removes all todos before every test
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);                               // sstops function and passes occured error to done
                }

                Todo.find().then((todos) => {                       //gets all todos
                    expect(todos.length).toBe(1);                   //should bo 1 todo in db
                    expect(todos[0].text).toBe(text);               //expexts todo text value to be type text
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should not create todo with invalid body data', (done) => {
        request(app)                                                //passing app to supertest
            .post('/todos')                                         //post request with todos path
            .send({})                                               //sending empty object
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {                       //fetches all todos inside collection
                    expect(todos.length).toBe(0);                   //expects 0 todos in db
                    done();
                }).catch((e) => done(e));                           //catches error and passes it into done
            })
    });
});