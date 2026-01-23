const mongoose = require('mongoose');

const MangaSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String }, 
    chapters: { type: Number },
    genres: [String],
    publishedDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    status: { type: String, default: "Ongoing" }
});

module.exports = mongoose.model('Manga', MangaSchema);