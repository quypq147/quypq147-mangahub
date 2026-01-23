const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên thể loại (Hành động, Tình cảm...)
    slug: { type: String, required: true, unique: true }, // URL thân thiện (hanh-dong, tinh-cam)
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Genre', GenreSchema);

