import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import helper from '../helpers/helper';
import usersArray from '../models/usersArray';

chai.use(chaiHttp);
const route = '/api/v1/articles/2';

const fakeUser = usersArray.storageArray[0];
const token = helper.generateToken(fakeUser);

const specificArticleSpec = () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .get(route)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(401);
        expect(body.status).to.equals(401);
        expect(body.error).to.equals('Unauthorized: You need to have a token');
      });
    done();
  });

  it('test response given invalid token', (done) => {
    chai
      .request(app)
      .get(route)
      .set('x-access-token', 'invalid')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.equals('Your token is invalid or have expired');
      });
    done();
  });

  it('test response if there is no article matching the given id', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/invalidId')
      .set('x-access-token', token)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal('Article with given id does not exists');
      });
    done();
  });

  it('test reaponse given the correct token', (done) => {
    chai
      .request(app)
      .get(route)
      .set('x-access-token', token)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equals('success');
        expect(body.data).to.be.an('object');
      });
    done();
  });
};

export default specificArticleSpec;
