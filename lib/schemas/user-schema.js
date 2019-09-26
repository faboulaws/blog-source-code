const { Schema } = require('mongoose');
module.exports = new Schema({
  username: String,
  id: Schema.Types.ObjectId
});