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

// 4. Get Single Thread Details + Posts
exports.getThreadBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find the thread and increment view count
    const thread = await ForumThread.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username avatar role'); // Get thread starter info

    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    // 2. Get all posts (replies) for this thread
    const posts = await ForumPost.find({ thread: thread._id })
      .populate('author', 'username avatar role')
      .sort({ createdAt: 1 }); // Oldest first

    res.status(200).json({ thread, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Post a Reply
exports.createReply = async (req, res) => {
  try {
    const { threadId, content } = req.body;

    if (!threadId || !content || !String(content).trim()) {
      return res.status(400).json({ error: 'threadId and content are required' });
    }

    const newPost = new ForumPost({
      content,
      thread: threadId,
      author: req.user.id // From auth middleware
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};