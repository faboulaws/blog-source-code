const fakingoose = require('fakingoose');
const ArticleSchema = require('../../../lib/schemas/article.schema');
const articleFactory = fakingoose(ArticleSchema, { _id: { tostring: false }, authorId: { tostring: false } });

module.exports = [
  articleFactory.generate(),
  articleFactory.generate()
];