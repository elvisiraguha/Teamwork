import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import usersArray from '../models/usersArray';
import User from '../helpers/User';

chai.use(chaiHttp);

const userPayload = {
  firstName: 'Elvis',
  lastName: 'Iraguha',
  password: 'iraguha',
  address: 'Kigali/Rwanda',
  gender: 'Male',
  jobRole: 'Student',
  email: 'iraguhaelvis@gmail.com',
  department: 'Production',
};

const fakeUser = new User(userPayload);
usersArray.storageArray.push(fakeUser);

const token = ((email) => {
  fakeUser.setToken(email);
  return fakeUser.getToken();
})(fakeUser.email);

const articlePayload = {
  title: 'My first Article',
  article: `This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting,
    Thank you for reading hope to see you next time`,
};

describe('POST /api/v1/articles', () => {
  it('test response given all required information', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('token', token)
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(201);
        expect(body.status).to.equals(201);
        expect(body.message).to.equal('article successfully created');
        expect(body.data).to.be.an('object');
      });
    done();
  });

  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('token', token)
      .send({})
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
        expect(body.error).to.have.lengthOf.at.least(10);
      });
    done();
  });

  it('test response given invalid token', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('token', 'invalid')
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equals('Your token is invalid or have expired');
      });
    done();
  });

  it('test response given no token', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.equals('You need to have a token');
        usersArray.removeUser(userPayload.email);
      });
    done();
  });
});
