const Forum = require('../../models/forum');
const ForumThread = require('../../models/forumThread');
const ForumPost = require('../../models/forumPost');

// 1. Get all Forum Categories (e.g., "Thảo luận chung", "Phát hành mới")
exports.getAllForums = async (req, res) => {
    try {
        const forums = await Forum.find({ isActive: true }).sort({ order: 1 });
        res.status(200).json(forums);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get Threads (Topics) for a specific Forum Category
exports.getThreadsByForum = async (req, res) => {
    try {
        const { forumSlug } = req.params;
        
        // Find the forum ID based on the slug (e.g., 'thao-luan-chung')
        const forum = await Forum.findOne({ slug: forumSlug });
        if (!forum) {
            return res.status(404).json({ error: 'Forum category not found' });
        }

        // Get threads, populate author info
        const threads = await ForumThread.find({ forum: forum._id })
            .populate('author', 'username avatar') // Get author details
            .sort({ isPinned: -1, lastPostAt: -1 }); // Pinned first, then newest activity

        res.status(200).json({
            forum: forum,
            threads: threads
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Create a new Thread
exports.createThread = async (req, res) => {
    try {
        const { title, content, forumId, threadType } = req.body;
        
        // Generate a simple slug from title
        const slug = title.toLowerCase().split(' ').join('-') + '-' + Date.now();

        const newThread = new ForumThread({
            title,
            slug,
            content,
            forum: forumId,
            author: req.user.id, // From auth middleware
            threadType: threadType || 'discussion'
        });

        await newThread.save();
        res.status(201).json(newThread);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};