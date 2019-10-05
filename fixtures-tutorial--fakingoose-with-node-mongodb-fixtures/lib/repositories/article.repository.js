const mongoose = require('mongoose');
const ArticleSchema = require('../schemas/article.schema');
const ArticleModel = mongoose.model('article', ArticleSchema);
const { Types: { ObjectId } } = mongoose;

exports.getAll = () =>
    ArticleModel.find({}).lean();

exports.getById = (id) => ArticleModel.findById(ObjectId(id)).lean()
   
    