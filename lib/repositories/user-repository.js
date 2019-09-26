const mongoose = require('mongoose');
const UserSchema = require('../schemas/user-schema');
const UserModel = mongoose.model('user', UserSchema);
exports.fetchUserByName = async (username) => {
    console.log(process.env.DB_URI);
        // ideally this should be done in app boostrap
        await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
        const users = await UserModel.findOne({username}).lean();
        return users;
    
};