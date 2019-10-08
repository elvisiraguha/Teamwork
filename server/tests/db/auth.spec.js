import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import data from '../mockData/users';

chai.use(chaiHttp);

const baseURL = '/api/v2/auth';
const authSpec = {
  signup() {
    it('test response given incomplete information or no information', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
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

    it('test response given all required information with incorrect method', (done) => {
      chai
        .request(app)
        .get(`${baseURL}/signup`)
        .send(data.newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information with incorrect method', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/signup`)
        .send(data.newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information with incorrect method', (done) => {
      chai
        .request(app)
        .put(`${baseURL}/signup`)
        .send(data.newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information with incorrect method', (done) => {
      chai
        .request(app)
        .delete(`${baseURL}/signup`)
        .send(data.newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/signup`)
        .send(data.newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(201);
          expect(body.status).to.equals(201);
          expect(body.message).to.equal('User created successfully');
          expect(body.data).to.be.an('object');
          expect(body.data.token).to.be.a('string');
        });
      done();
    });

    it('test response given the used email address', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/signup`)
        .send(data.newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(409);
          expect(body.status).to.equals(409);
          expect(body.error).to.equals('User with given email already exists');
        });
      done();
    });
  },
};

export default authSpec;
