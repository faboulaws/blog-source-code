var express = require('express');
var articles = require('./controllers/article.controller');
const { init: initDb } = require('./db');
const dic = require('./di').init();
const app = express();

app.use('/articles', articles(express.Router(), dic));

exports.start = async (config) => {
    await initDb(config.DB_URL);
    return app;
}