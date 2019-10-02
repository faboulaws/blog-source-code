const fakingoose = require('fakingoose');
const UserSchema = require('../../../lib/schemas/user-schema');
const userFactory = fakingoose(UserSchema);
module.exports = [
  userFactory.generate(),
  userFactory.generate(),
];