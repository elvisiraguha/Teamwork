import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import usersArray from '../models/usersArray';
import helper from '../helpers/helper';
import articlesArray from '../models/articlesArray';

chai.use(chaiHttp);

const commentPayload = {
  comment: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time',
};

const fakeUser = usersArray.storageArray[0];
const token = helper.generateToken(fakeUser);
const fakeArticle = articlesArray.storageArray[3];

const route = `/api/v1/articles/${fakeArticle.id}/comments`;

const addCommentSpec = () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .post(route)
      .send(commentPayload)
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
      .post(route)
      .set('x-access-token', 'invalid')
      .send(commentPayload)
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
      .post('/api/v1/articles/invalidId/comments')
      .set('x-access-token', token)
      .send(commentPayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal('Article with given id does not exists');
      });
    done();
  });

  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .post(route)
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
      .post(route)
      .set('x-access-token', token)
      .send(commentPayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(201);
        expect(body.status).to.equals(201);
        expect(body.message).to.equal('comment successfully added');
        expect(body.data).to.be.an('object');
      });
    done();
  });
};

export default addCommentSpec;
