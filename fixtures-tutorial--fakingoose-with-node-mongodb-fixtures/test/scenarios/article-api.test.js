const chai = require('chai');
const chaiHttp = require('chai-http');
const createArticles = require('../fixtures/article.fixtures');
const appSetup = require('../setup');
const { expect } = chai;
chai.use(chaiHttp);
const stringifyProps = (object) => JSON.parse(JSON.stringify(object))

describe('Articles', () => {
    let deleteArticles, articles, stopDb, dbUrl, app;
    before(async () => {
        ({ app, dbUrl, stopDb } = await appSetup.init());
        ({ cleanup: deleteArticles, entities: articles } = await createArticles(`${dbUrl}/test-db`));
    });
    after(() => deleteArticles().then(stopDb));
    describe('GET /', () => {
        it('must fetch all articles', async () => {
            const response = await chai.request(app)
                .get('/articles');
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('object').with.property('articles');
            const expectedArticles = articles.map(stringifyProps);
            const actualArticles = response.body.articles.map(stringifyProps);
            expect(actualArticles).to.eql(expectedArticles)
        });

        it('must fetch a single article by ID', async () => {
            const [, secondArticle] = articles;
            const response = await chai.request(app)
                .get(`/articles/${secondArticle._id}`);
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object').with.property('article');
            const expectedArticle = stringifyProps(secondArticle);
            const actualActicle = stringifyProps(response.body.article);
            expect(actualActicle).to.eql(expectedArticle);
        });

        it('must fetch respond with not found', async () => {
            const response = await chai.request(app)
                .get(`/articles/${articles[1].authorId}`);
            expect(response).to.have.status(404);
        });
    });
});