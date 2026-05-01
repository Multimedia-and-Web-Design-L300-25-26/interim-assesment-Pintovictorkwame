const Crypto = require("../models/Crypto");

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

const getNewestCoins = async (req, res, next) => {
  try {
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

    const newest = await Crypto.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json({ success: true, data: newest });
  } catch (error) {
    next(error);
  }
};

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

const SEED_DATA = [
  { name: "Bitcoin", symbol: "BTC", price: 65420.18, change24h: 2.34, image: "/assets/images/bitcoin.svg" },
  { name: "Ethereum", symbol: "ETH", price: 3218.44, change24h: -1.12, image: "/assets/images/ethereum.svg" },
  { name: "Tether", symbol: "USDT", price: 1.0, change24h: 0.01, image: "/assets/images/tether.svg" },
  { name: "BNB", symbol: "BNB", price: 412.3, change24h: 0.48, image: "/assets/images/BNB.png" },
  { name: "Solana", symbol: "SOL", price: 152.87, change24h: 5.76, image: "/assets/images/Solana.png" },
  { name: "XRP", symbol: "XRP", price: 0.5823, change24h: -2.11, image: "/assets/images/XRP.png" },
  { name: "USD Coin", symbol: "USDC", price: 1.0, change24h: 0.02, image: "/assets/images/usdc.svg" },
  { name: "Cardano", symbol: "ADA", price: 0.4521, change24h: 1.05, image: "/assets/images/Cardano.png" },
  { name: "Avalanche", symbol: "AVAX", price: 38.74, change24h: 3.21, image: "/assets/images/Avalanche.png" },
  { name: "Dogecoin", symbol: "DOGE", price: 0.1624, change24h: -0.87, image: "/assets/images/dogecoin.svg" },
  { name: "Cosmos", symbol: "ATOM", price: 8.42, change24h: 1.93, image: "" },
  { name: "Polkadot", symbol: "DOT", price: 7.18, change24h: -0.56, image: "" },
  { name: "Polygon", symbol: "POL", price: 0.7831, change24h: 4.12, image: "" },
  { name: "Chainlink", symbol: "LINK", price: 14.63, change24h: 2.88, image: "" },
  { name: "Litecoin", symbol: "LTC", price: 82.45, change24h: -1.34, image: "" },
  { name: "Stellar", symbol: "XLM", price: 0.1182, change24h: 0.73, image: "" },
  { name: "Uniswap", symbol: "UNI", price: 9.27, change24h: 6.15, image: "" },
  { name: "Monero", symbol: "XMR", price: 163.2, change24h: -0.44, image: "" },
];

const seedCryptos = async (req, res, next) => {
  try {
    const existing = await Crypto.countDocuments();
    if (existing > 0) {
      return res.status(200).json({
        success: true,
        message: `Database already has ${existing} cryptocurrencies. Nothing inserted.`,
        count: existing,
      });
    }

    await Crypto.insertMany(SEED_DATA);

    res.status(201).json({
      success: true,
      message: `Seeded ${SEED_DATA.length} cryptocurrencies successfully.`,
      count: SEED_DATA.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCrypto, getTopGainers, getNewestCoins, addCrypto, seedCryptos };
