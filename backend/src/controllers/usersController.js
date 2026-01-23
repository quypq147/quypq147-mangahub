const User = require("../../models/user");

// Lấy danh sách toàn bộ user (cho trang Manage Users)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Không trả về mật khẩu
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật quyền hạn (Role) cho User
exports.updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body; // role: 'admin', 'uploader', 'user'
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    ).select("-password");
    
    res.status(200).json({ message: "Cập nhật quyền thành công", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};