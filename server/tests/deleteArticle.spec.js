import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import usersArray from '../models/usersArray';
import helper from '../helpers/helper';
import articlesArray from '../models/articlesArray';

chai.use(chaiHttp);

const fakeUser = usersArray.storageArray[0];
const fakeUser2 = usersArray.storageArray[1];

const token = helper.generateToken(fakeUser);
const token2 = helper.generateToken(fakeUser2);


const fakeArticle = articlesArray.storageArray[2];
const fakeArticle2 = articlesArray.storageArray[3];

const deleteArticleSpec = () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${fakeArticle.id}`)
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
      .delete(`/api/v1/articles/${fakeArticle.id}`)
      .set('x-access-token', 'invalid')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.equals('Your token is invalid or have expired');
      });
    done();
  });

  it('test response if there is no article by this user', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${fakeArticle.id}`)
      .set('x-access-token', token)
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
      .delete('/api/v1/articles/invalidId')
      .set('x-access-token', token2)
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
        expect(res).to.have.status(403);
        expect(body.status).to.equals(403);
        expect(body.error).to.equal('Forbidden: An article you are trying to delete is not yours');
      });
    done();
  });
  it('test response if given information are correct', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${fakeArticle2.id}`)
      .set('x-access-token', token2)
      .end((err, res) => {
        expect(res).to.have.status(204);
      });
    done();
  });
};

export default deleteArticleSpec;
