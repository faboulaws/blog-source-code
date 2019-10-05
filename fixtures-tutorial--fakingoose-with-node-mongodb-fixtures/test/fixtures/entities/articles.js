const fakingoose = require('fakingoose');
const ArticleSchema = require('../../../lib/schemas/article.schema');
const { convertObjectIds } = require('../utils');
const articleFactory = fakingoose(ArticleSchema);

const generateArticle = () => {
  const article = articleFactory.generate();
  return convertObjectIds(article, ['_id', 'authorId']);
};

module.exports = [
  generateArticle(),
  generateArticle()
];