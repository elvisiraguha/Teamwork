import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import data from '../mockData/users';

chai.use(chaiHttp);

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
        .get('/api/v1/auth/signup')
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
        .patch('/api/v1/auth/signup')
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
        .put('/api/v1/auth/signup')
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
        .delete('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
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

  signin() {
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
        .send(data.nonExistingUser)
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
        .post('/api/v1/auth/signin')
        .send(data.existingUserPasswdIncorrect)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Given password is incorrect');
        });
      done();
    });

    it('test response given all required information they are correct with incorrect method', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/signin')
        .send(data.existingUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information they are correct with incorrect method', (done) => {
      chai
        .request(app)
        .delete('/api/v1/auth/signin')
        .send(data.existingUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information they are correct with incorrect method', (done) => {
      chai
        .request(app)
        .patch('/api/v1/auth/signin')
        .send(data.existingUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information they are correct with incorrect method', (done) => {
      chai
        .request(app)
        .put('/api/v1/auth/signin')
        .send(data.existingUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
      done();
    });

    it('test response given all required information they are correct', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(data.existingUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.status).to.equals(200);
          expect(body.message).to.equal('User is successfully logged in');
          expect(body.data).to.be.an('object');
          expect(body.data.token).to.be.a('string');
        });
      done();
    });
  },
};

export default authSpec;
