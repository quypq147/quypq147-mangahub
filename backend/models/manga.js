const mongoose = require('mongoose');

const MangaSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    chapters: { type: Number, required: true },
    genres: [String],
    publishedDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 }
});

module.exports = mongoose.model('Manga', MangaSchema);