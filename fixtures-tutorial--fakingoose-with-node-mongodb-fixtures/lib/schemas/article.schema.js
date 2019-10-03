const { Schema } = require('mongoose');
module.exports =  new Schema({
    title: String,
    body: String,
    authorId: Schema.Types.ObjectId,
    created: Date,
    updated: Date
});