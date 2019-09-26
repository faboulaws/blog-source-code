const Fixtures = require('node-mongodb-fixtures');
module.exports = async () => {
    const fixtures = new Fixtures({ dir: 'test/fixtures/entities' });
    await fixtures.connect(process.env.DB_URI).then(() => fixtures.load());
    const users = await Promise.resolve(fixtures._db.collection('users'))
        .then((collection) => {
            return collection.find().toArray();
        });
    const unseed = () => fixtures.unload()
        .then(() => fixtures.disconnect());
    return { unseed, users };
}