const express = require("express");
const router = express.Router();
const {
  getAllCrypto,
  getTopGainers,
  getNewestCoins,
  addCrypto,
  seedCryptos,
} = require("../controllers/cryptoController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Specific named routes must come before parameterized routes
router.get("/gainers", getTopGainers);
router.get("/new", getNewestCoins);
router.post("/seed", seedCryptos);

router.get("/", getAllCrypto);
router.post("/", protect, adminOnly, addCrypto);

module.exports = router;
