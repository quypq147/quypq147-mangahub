const User = require('../../models/user');
const Manga = require('../../models/manga');

// Lấy thông tin cá nhân (Profile)
exports.getProfile = async (req, res) => {
    try {
        // req.user.id lấy từ middleware xác thực (JWT)
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách truyện đã lưu (Bookmarks)
exports.getBookmarks = async (req, res) => {
    try {
        // populate('bookmarks') sẽ tự động lấy chi tiết truyện từ mảng ID
        const user = await User.findById(req.user.id).populate('bookmarks');
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user.bookmarks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};