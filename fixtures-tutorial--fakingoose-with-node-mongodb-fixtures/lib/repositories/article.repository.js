const mongoose = require('mongoose');
const ArticleSchema = require('../schemas/article.schema');
const ArticleModel = mongoose.model('article', ArticleSchema);

exports.getAll = async () => {
    try {
        // await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

        const articles = await ArticleModel.find({}).lean();
        return articles;
    } catch (e) {
        throw e;
    }
};