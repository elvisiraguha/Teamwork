import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

const userPayload = {
  firstName: 'Iraguha',
  lastName: 'Elvis',
  password: 'monkey',
  address: 'Kigali/Rwanda',
  gender: 'Male',
  jobRole: 'Student',
  email: 'elvis@student.edu',
  department: 'Production',
};

const signupSpec = () => {
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

  it('test response given all required information', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(userPayload)
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
      .send(userPayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(409);
        expect(body.status).to.equals(409);
        expect(body.error).to.equals('User with given email already exists');
      });
    done();
  });
};

export default signupSpec;