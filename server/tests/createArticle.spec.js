import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import helper from '../helpers/helper';
import usersArray from '../models/usersArray';

chai.use(chaiHttp);

const articlePayload = {
  title: 'My first Article',
  article: `This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting,
    Thank you for reading hope to see you next time`,
};

const fakeUser = usersArray.storageArray[1];
const token = helper.generateToken(fakeUser);

const createArticleSpec = () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(articlePayload)
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
      .post('/api/v1/articles')
      .set('x-access-token', 'invalid')
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.equals('Your token is invalid or have expired');
      });
    done();
  });

  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
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
      .post('/api/v1/articles')
      .set('x-access-token', token)
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
};

export default createArticleSpec;
