const appBootstrap = require('../../lib/bootstrap');
const { startDb } = require('./db');

exports.init = async () => {
    ({ stopDb, dbUrl } = await startDb());
    const app = await appBootstrap.start({ DB_URL: `${dbUrl}/test-db`, PORT: 30000 });
    return { app, dbUrl, stopDb };
};