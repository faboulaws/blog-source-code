const fakingoose = require('fakingoose');
const ArticleSchema = require('../../../lib/schemas/article.schema');
const articleFactory = fakingoose(ArticleSchema);
module.exports = [
  articleFactory.generate(),
  articleFactory.generate(),
];