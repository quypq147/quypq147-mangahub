const mongoose = require('mongoose');

const ForumPostSchema = mongoose.Schema({
    content: { type: String, required: true },
    
    // Relations
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumThread', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Nested Replies (Optional)
    // If null, it's a direct reply to the thread. If set, it's a reply to another post.
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost', default: null },

    isEdited: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware: Update timestamps
ForumPostSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Optional: After saving a post, update the thread's 'lastPostAt' and 'replyCount'
ForumPostSchema.post('save', async function(doc) {
    const ForumThread = mongoose.model('ForumThread');
    await ForumThread.findByIdAndUpdate(doc.thread, {
        $set: { lastPostAt: new Date() },
        $inc: { replyCount: 1 }
    });
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);