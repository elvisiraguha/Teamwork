import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import usersArray from '../models/usersArray';
import articlesArray from '../models/articlesArray';
import helper from '../helpers/helper';

chai.use(chaiHttp);

const newArticle = {
  title: 'My first Article',
  article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time',
};

const fakeUser = usersArray.storageArray[0];
const fakeUser2 = usersArray.storageArray[1];

const token = helper.generateToken(fakeUser);
const token2 = helper.generateToken(fakeUser2);

const fakeArticle = articlesArray.storageArray[0];
const fakeArticle2 = articlesArray.storageArray[3];

const editArticleSpec = () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .send(newArticle)
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
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .set('x-access-token', 'invalid')
      .send(newArticle)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equals('Your token is invalid or have expired');
      });
    done();
  });

  it('test response if there is no article by this user', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .set('x-access-token', token)
      .send(newArticle)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal(`Dear ${fakeUser.lastName} you have not created any articles yet!`);
      });
    done();
  });

  it('test response if there is no article matching the given id', (done) => {
    chai
      .request(app)
      .patch('/api/v1/articles/invalidId')
      .set('x-access-token', token2)
      .send(newArticle)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal('Article with given id does not exists');
      });
    done();
  });

  it('test response if you are trying to delete an article which is not yours', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${fakeArticle.id}`)
      .set('x-access-token', token2)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(401);
        expect(body.status).to.equals(401);
        expect(body.error).to.equal('Unauthorized: An article you are trying to delete is not yours');
      });
    done();
  });

  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${fakeArticle2.id}`)
      .set('x-access-token', token2)
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
      .patch(`/api/v1/articles/${fakeArticle2.id}`)
      .set('x-access-token', token2)
      .send(newArticle)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equal('article successfully edited');
        expect(body.data).to.be.an('object');
      });
    done();
  });
};

export default editArticleSpec;
