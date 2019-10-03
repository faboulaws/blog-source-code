const Fixtures = require('node-mongodb-fixtures');
const path = require('path');
module.exports = async (dbUrl) => {
    const fixtures = new Fixtures({ dir: path.resolve(__dirname, './entities') });
    await fixtures.connect(dbUrl).then(() => fixtures.load()).catch(e => {
        throw e;
    });
    const articles = await Promise.resolve(fixtures._db.collection('articles'))
        .then((collection) => {
            return collection.find().toArray();
        });
    const cleanup = () => fixtures.unload()
        .then(() => fixtures.disconnect());
    return { cleanup, entities: articles };
}