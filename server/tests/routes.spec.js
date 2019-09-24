import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', () => {
  it('test response given all required information', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elvis',
        lastName: 'Iraguha',
        password: 'iraguha',
        address: 'Kigali/Rwanda',
        gender: 'Male',
        jobRole: 'Student',
        email: 'iraguhaelvis@gmail.com',
        department: 'Construction Managment',
      })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equals(201);
        expect(body.message).to.be.a('string');
        expect(body.message).to.have.lengthOf.at.least(10);
        expect(body.data).to.be.an('object');
      });
  });

  it('test response given incomplete information or no information', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elvis',
      })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equals(400);
        expect(body.status).to.equals(400);
        expect(body.message).to.have.lengthOf.at.least(10);
        expect(body.message).to.be.a('string');
      });
  });
});
