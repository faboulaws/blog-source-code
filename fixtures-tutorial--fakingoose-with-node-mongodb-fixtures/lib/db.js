const mongoose = require('mongoose');

exports.init = async (url) => {
   const connection = await mongoose.connect(url, {useNewUrlParser: true});
   return connection;
}