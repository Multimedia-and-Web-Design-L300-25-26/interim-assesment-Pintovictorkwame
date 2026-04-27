const Crypto = require("../models/Crypto");

// @desc    Get all cryptocurrencies (with pagination)
// @route   GET /api/crypto?page=1&limit=10
// @access  Public
const getAllCrypto = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [cryptos, total] = await Promise.all([
      Crypto.find().skip(skip).limit(limit),
      Crypto.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: cryptos,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get top gainers (sorted by change24h DESC)
// @route   GET /api/crypto/gainers
// @access  Public
const getTopGainers = async (req, res, next) => {
  try {
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

    const gainers = await Crypto.find({ change24h: { $gt: 0 } })
      .sort({ change24h: -1 })
      .limit(limit);

    res.status(200).json({ success: true, data: gainers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get newest coins (sorted by createdAt DESC)
// @route   GET /api/crypto/new
// @access  Public
const getNewestCoins = async (req, res, next) => {
  try {
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

    const newest = await Crypto.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json({ success: true, data: newest });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new cryptocurrency
// @route   POST /api/crypto
// @access  Private/Admin
const addCrypto = async (req, res, next) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || price === undefined || change24h === undefined) {
      res.status(400);
      throw new Error("Please provide name, symbol, price, and change24h");
    }

    if (typeof price !== "number" || price < 0) {
      res.status(400);
      throw new Error("Price must be a non-negative number");
    }

    const crypto = await Crypto.create({ name, symbol, price, image, change24h });

    res.status(201).json({
      success: true,
      message: "Crypto added successfully",
      data: crypto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCrypto, getTopGainers, getNewestCoins, addCrypto };
