const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
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
                    return done(err);                               // stops function and passes occured error to done
                }

                Todo.find({text}).then((todos) => {                       //gets all todos with {text} value
                    expect(todos.length).toBe(1);                   //should be 1 todo in db
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
                    expect(todos.length).toBe(2);                   //expects 0 todos in db
                    done();
                }).catch((e) => done(e));                           //catches error and passes it into done
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
               expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(new ObjectID().toHexString())
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });


    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = 'patch text';

        request(app)                                                // first send request
            .patch(`/todos/${hexId}`)                               // type patch
            .send({                                                 // specify data
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {                                      // expects response
                expect(res.body.todo.text).toBe(text);              // with specified data
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeNumber;
            })
            .end(done);
        });





    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = 'patch changed text';

        request(app)
            .patch(`/todos/${hexId}`)
            .expect(200)
            .send({
                completed: false,
                text
            })
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                console.log(res);
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completedAt).toNotExist;
            })
            .end(done);
    });
});

