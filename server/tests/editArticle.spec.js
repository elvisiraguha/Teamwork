import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import usersArray from '../models/usersArray';
import User from '../helpers/User';
import Article from '../helpers/Article';
import articlesArray from '../models/articlesArray';

chai.use(chaiHttp);

const userPayload = {
  firstName: 'Elvis',
  lastName: 'Iraguha',
  password: 'iraguha',
  address: 'Kigali/Rwanda',
  gender: 'Male',
  jobRole: 'Student',
  email: 'iraguhaelvis@gmail.com',
  department: 'Production',
};

const articlePayload = {
  title: 'My first Article',
  article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time',
};

const fakeUser = new User(userPayload);

const fakeArticle = new Article(articlePayload, fakeUser.id);

const token = ((email) => {
  fakeUser.setToken(email);
  return fakeUser.getToken();
})(fakeUser.email);

export default describe('PATCH /articles/<articleId>', () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.equals('You need to have a token');
      });
    done();
  });

  it('test response given invalid token', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .set('token', 'invalid')
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equals('Your token is invalid or have expired');
        usersArray.addUser(fakeUser);
      });
    done();
  });

  it('test response if there is no article by this user', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .set('token', token)
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal(`Dear ${fakeUser.lastName} you have not created any articles yet!`);
        articlesArray.addArticle(fakeArticle);
      });
    done();
  });

  it('test response if there is no article matching the given id', (done) => {
    chai
      .request(app)
      .patch('/api/v1/articles/invalidId')
      .set('token', token)
      .send(articlePayload)
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
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .set('token', token)
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
      .patch(`/api/v1/articles/${fakeArticle.id}`)
      .set('token', token)
      .send(articlePayload)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equal('article successfully edited');
        expect(body.data).to.be.an('object');
        usersArray.resetStorage();
        articlesArray.resetStorage();
      });
    done();
  });
});
