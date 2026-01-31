const mongoose = require('mongoose');

const ForumSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "Thảo luận chung"
    slug: { type: String, required: true, unique: true }, // e.g., "thao-luan-chung"
    description: { type: String }, // e.g., "Nơi chém gió về mọi thứ"
    order: { type: Number, default: 0 }, // For sorting categories in the sidebar
    isActive: { type: Boolean, default: true },
    
    // Stats (Optional: update these when threads/posts are added)
    threadCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Forum', ForumSchema);