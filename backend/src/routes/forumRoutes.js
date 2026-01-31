const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { verifyToken } = require('../middleware/auth'); // Assuming you have this

// Public Routes
router.get('/categories', forumController.getAllForums);
router.get('/category/:forumSlug', forumController.getThreadsByForum);

// Protected Routes (Require Login)
router.post('/thread', verifyToken, forumController.createThread);

module.exports = router;