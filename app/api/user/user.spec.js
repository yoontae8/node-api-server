
/*
// mocha
const assert = require('assert');
describe('GET /users', () => {
  it('true is true', () => {
    assert.equal(true, true);
  })
})
*/

/*
// should
const should = require('should');

describe('GET /users', () => {
  it('true is true', () => {
    (true).should.be.equal(true);
  })
})
*/
const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /users', () => {
  before('sync database', (done) => {
    syncDatabase().then( () => {
      done();
    });
  });

  const users = [
    { name: 'alice' },
    { name: 'bek' },
    { name: 'chris' }
  ];
  before('insert 3 users into database', (done) => {
    models.User.bulkCreate(users).then(() => {
      done();
    });
  });
  it('should return 200 status code', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.be.instanceOf(Array);
        res.body.should.be.have.length(3);
        res.body.forEach( user => {
          user.should.have.properties('id', 'name');
          user.id.should.be.a.Number();
          user.name.should.be.a.String();
        });
        done();
      });
  });
  after('clear up database', (done) => {
    syncDatabase().then(() => done());
  });
});

describe('GET /users/:id', () => {
  before('sync database', (done) => {
    syncDatabase().then( () => {
      done();
    });
  });

  const users = [
    { name: 'alice' },
    { name: 'bek' },
    { name: 'chris' }
  ];
  before('insert 3 users into database', (done) => {
    models.User.bulkCreate(users).then(() => {
      done();
    });
  });

  it('should return user object', (done) => {
      request(app)
      .get('/users/2')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties('id', 'name');
        res.body.id.should.be.a.Number();
        res.body.name.should.be.a.String();
        done();
      });
  });

  it('should return 400', (done) => {
      request(app)
      .get('/users/abc')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return 404', (done) => {
    request(app)
      .get('/users/4')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property('error');
        done();
      });
  });
  after('clear up database', (done) => {
    syncDatabase().then(() => done());
  });
});


describe('DELETE /users/:id', () => {
  before('sync database', (done) => {
    syncDatabase().then( () => {
      done();
    });
  });

  const users = [
    { name: 'alice' },
    { name: 'bek' },
    { name: 'chris' }
  ];
  before('insert 3 users into database', (done) => {
    models.User.bulkCreate(users).then(() => {
      done();
    });
  });

  it('should return 204 status code', (done) => {
      request(app)
      .delete('/users/2')
      .expect(204)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('should return 400', (done) => {
      request(app)
      .delete('/users/abc')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return 404', (done) => {
    request(app)
      .delete('/users/8')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property('error');
        done();
      });
  });
  after('clear up database', (done) => {
    syncDatabase().then(() => done());
  });
});

describe('POST /users', () => {
  before('sync database', (done) => {
    syncDatabase().then( () => {
      done();
    });
  });

  const users = [
    { name: 'alice' },
    { name: 'bek' },
    { name: 'chris' }
  ];
  before('insert 3 users into database', (done) => {
    models.User.bulkCreate(users).then(() => {
      done();
    });
  });

  it('should return user info', (done) => {
    const name = 'Ryan';
      request(app)
      .post('/users')
      .send({ name: name})
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties('id', 'name');
        res.body.name.should.be.equal(name);
        done();
      });
  });

  it('should return 400', (done) => {
      request(app)
      .post('/users')
      .send({ name: ""})
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property('error');
        done();
      });
  });
  after('clear up database', (done) => {
    syncDatabase().then(() => done());
  });
});
