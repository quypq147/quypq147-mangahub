const jwt = require("jsonwebtoken");
const User = require("../../models/user"); // <-- fix path (was ../models/user)

const verifyToken = (req, res, next) => {
  const raw = req.header("Authorization");
  if (!raw) return res.status(401).json({ message: "Truy cập bị từ chối" });

  // Accept both: "Bearer <token>" and "<token>"
  const token = raw.startsWith("Bearer ") ? raw.slice("Bearer ".length) : raw;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token không hợp lệ" });
  }
};

const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, async () => {
    const user = await User.findById(req.user.id);
    // Giả sử role 0: User, 1: Uploader, 2: Admin
    if (user.role === 2 || user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Bạn không có quyền Admin" });
    }
  });
};

module.exports = verifyToken;
module.exports.verifyToken = verifyToken;
module.exports.verifyAdmin = verifyAdmin;