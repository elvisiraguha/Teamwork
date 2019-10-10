import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import userData from './mockData/data';

chai.use(chaiHttp);

const baseURL = '/api/v2/auth';

describe('Other routes', () => {
  it('any others routes which are not specified', (done) => {
    chai
      .request(app)
      .get('/*')
      .end((err, res) => {
        expect(res).to.have.status(405);
        expect(res.body.error).to.equals('Method not allowed');
      });
    done();
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('test response given incomplete information or no information', (done) => {
    chai
      .request(app)
      .post(`${baseURL}/signup`)
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

  it('test response given the used email address', (done) => {
    chai
      .request(app)
      .post(`${baseURL}/signup`)
      .send(userData[2])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(409);
        expect(body.status).to.equals(409);
        expect(body.error).to.equals('User with given email already exists');
      });
    done();
  });

  it('test response given all required information', (done) => {
    chai
      .request(app)
      .post(`${baseURL}/signup`)
      .send(userData[1])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(201);
        expect(body.status).to.equals(201);
        expect(body.message).to.equal('User created successfully');
        expect(body.data).to.be.an('object');
        expect(body.userData.token).to.be.a('string');
      });
    done();
  });
});

describe('POST /api/v1/auth/signin', () => {
  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .post(`${baseURL}/signin`)
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
      .post(`${baseURL}/signin`)
      .send(userData[4])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equals('User with given email does not exists');
      });
    done();
  });

  it('test response given invalid password', (done) => {
    chai
      .request(app)
      .post(`${baseURL}/signin`)
      .send(userData[0])
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
      .post(`${baseURL}/signin`)
      .send(userData[3])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equal('User is successfully logged in');
        expect(body.data).to.be.an('object');
        expect(body.userData.token).to.be.a('string');
      });
    done();
  });
});
