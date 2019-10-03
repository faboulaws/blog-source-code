const chai = require('chai');
const chaiHttp = require('chai-http');
const createArticles = require('./fixtures/article.fixtures');
const appBootstrap = require('../lib/bootstrap');
const { startDb } = require('./setup/db');
const { expect } = chai;
chai.use(chaiHttp);
chai.should();

const articlesSummary = (articles) => articles.map(({ _id, title, body, authorId }) => ({ _id, title, body, authorId }));

describe('Articles', () => {
    let deleteArticles, articles, stopDb, dbUrl, app;
    before(async () => {
        ({ stopDb, dbUrl } = await startDb());
        (app = await appBootstrap.start({ DB_URL: `${dbUrl}/test-db`, PORT: 30000 }));
        ({ cleanup: deleteArticles, entities: articles } = await createArticles(`${dbUrl}/test-db`));
    });
    after(() => deleteArticles().then(stopDb));
    describe('GET /', () => {
        it('must fetch all articles', async () => {
            const getResponse = await chai.request(app)
                .get('/articles');
            getResponse.should.have.status(200);
            getResponse.body.should.be.a('object').with.property('articles');
            const { body: { articles: apiArticles } } = getResponse;
            expect(articlesSummary(apiArticles), 'Should have saved articles').to.eql(articlesSummary(articles));
        });
    });
});