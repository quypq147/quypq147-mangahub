const mongoose = require('mongoose');

const ChapterSchema = mongoose.Schema({
    mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
    chapterNumber: { type: Number, required: true },
    title: { type: String },
    pages: [{ type: String, required: true }], 
    releaseDate: { type: Date, default: Date.now }
});