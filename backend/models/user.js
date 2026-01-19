const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
	
    role: {
        type: String,
        enum: ['user', 'admin', 'uploader', 'moderator'],
        default: 'user'
    },
	
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', UserSchema);