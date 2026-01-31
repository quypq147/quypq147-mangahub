const mongoose = require('mongoose');

const ForumThreadSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true }, // URL-friendly title
    content: { type: String, required: true }, // Initial post content
    
    // Relations
    forum: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true }, // The Category this belongs to
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The User who posted it
    
    // Thread Classification
    threadType: { 
        type: String, 
        enum: ['discussion', 'question', 'announcement', 'spoiler'], 
        default: 'discussion' 
    },

    // Metadata
    views: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 }, // Cache the number of replies
    isPinned: { type: Boolean, default: false }, // Sticky threads
    isLocked: { type: Boolean, default: false }, // Prevent new replies
    
    // Optional: Link to a specific Manga (e.g., "Discussion for One Piece")
    relatedManga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' }, 

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastPostAt: { type: Date, default: Date.now } // To sort by "Last Activity"
});

// Middleware: Update timestamps on save
ForumThreadSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('ForumThread', ForumThreadSchema);