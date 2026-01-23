const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Middleware kiểm tra token (bạn cần tự tạo hoặc dùng lại từ authController)
const { verifyAdmin } = require("../middleware/auth");

// API cần đăng nhập mới gọi được
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/bookmarks', authMiddleware, userController.getBookmarks);
router.get("/all", verifyAdmin, userController.getAllUsers); 
router.put("/role", verifyAdmin, userController.updateUserRole);

module.exports = router;