const express = require("express");
const router = express.Router();
const {
  getAllCrypto,
  getTopGainers,
  getNewestCoins,
  addCrypto,
} = require("../controllers/cryptoController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Specific named routes must come before parameterized routes
router.get("/gainers", getTopGainers);
router.get("/new", getNewestCoins);

router.get("/", getAllCrypto);
router.post("/", protect, adminOnly, addCrypto);

module.exports = router;
