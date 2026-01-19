const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    profilePicture: { type: String },
    platformLinks: {
        website: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        pixiv: { type: String },
        other: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model('Author', AuthorSchema);