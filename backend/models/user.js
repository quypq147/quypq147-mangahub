const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { 
        type: String, 
        enum: ['user', 'admin', 'uploader', 'moderator'], 
        default: 'user' 
    },
    isDisabled: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isLinkedToExternalService: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);