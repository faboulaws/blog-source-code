const mongoose = require('mongoose');
const ArticleSchema = require('../schemas/article.schema');
const ArticleModel = mongoose.model('article', ArticleSchema);

exports.getAll = async () => {
    try {
        const articles = await ArticleModel.find({}).lean();
        return articles;
    } catch (e) {
        throw e;
    }
};