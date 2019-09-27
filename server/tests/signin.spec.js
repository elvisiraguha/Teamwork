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

const signinPayload = {
  password: 'iraguha',
  email: 'iraguhaelvis@gmail.com',
};

const fakeUser = new User(userPayload);

describe('POST /api/v1/auth/signin', () => {
  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
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

  it('test response given email address which dont exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(signinPayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equals('User with given email does not exists');
        usersArray.addUser(fakeUser);
      });
    done();
  });

  it('test response given invalid password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        password: 'invalid',
        email: 'iraguhaelvis@gmail.com',
      })
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(401);
        expect(body.status).to.equals(401);
        expect(body.error).to.equals('Given password is incorrect');
      });
    done();
  });
  it('test response given all required information they are correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(signinPayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equal('User is successfully logged in');
        expect(body.data).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        usersArray.resetStorage();
      });
    done();
  });
});
