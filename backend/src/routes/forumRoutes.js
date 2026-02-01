const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Support both export styles used in this repo
const auth = require('../middleware/auth');
const verifyToken = auth.verifyToken || auth;

// Public Routes
router.get('/categories', forumController.getAllForums);
router.get('/category/:forumSlug', forumController.getThreadsByForum);
router.get('/thread/:slug', forumController.getThreadBySlug);

// Protected Routes (Require Login)
router.post('/thread', verifyToken, forumController.createThread);
router.post('/reply', verifyToken, forumController.createReply);

module.exports = router;