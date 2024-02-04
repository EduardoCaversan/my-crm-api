const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mainWhatsapp: { type: String, required: true },
    consumers: {
        type: [
            {
                name: String,
                mobileNumber: String
            }
        ], required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
