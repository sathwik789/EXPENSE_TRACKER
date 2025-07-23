const express = require("express");
const { verifyOtp } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Use BACKEND_URL from env, fallback to request protocol+host (for localhost testing)
  const serverUrl = 'https://expense-tracker-backend-82la.onrender.com' || `${req.protocol}://${req.get("host")}`;
  const imageUrl = `${serverUrl}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

module.exports = router;
