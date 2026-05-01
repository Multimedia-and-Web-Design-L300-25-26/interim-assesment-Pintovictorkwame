require("dotenv").config();
const mongoose = require("mongoose");
const Crypto = require("./models/Crypto");
const connectDB = require("./config/db");

const CRYPTOS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 65420.18,
    change24h: 2.34,
    image: "/assets/images/bitcoin.svg",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3218.44,
    change24h: -1.12,
    image: "/assets/images/ethereum.svg",
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    change24h: 0.01,
    image: "/assets/images/tether.svg",
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 412.3,
    change24h: 0.48,
    image: "/assets/images/BNB.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 152.87,
    change24h: 5.76,
    image: "/assets/images/Solana.png",
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 0.5823,
    change24h: -2.11,
    image: "/assets/images/XRP.png",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0,
    change24h: 0.02,
    image: "/assets/images/usdc.svg",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.4521,
    change24h: 1.05,
    image: "/assets/images/Cardano.png",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: 38.74,
    change24h: 3.21,
    image: "/assets/images/Avalanche.png",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.1624,
    change24h: -0.87,
    image: "/assets/images/dogecoin.svg",
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    price: 8.42,
    change24h: 1.93,
    image: "",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.18,
    change24h: -0.56,
    image: "",
  },
  {
    name: "Polygon",
    symbol: "POL",
    price: 0.7831,
    change24h: 4.12,
    image: "",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    price: 14.63,
    change24h: 2.88,
    image: "",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: 82.45,
    change24h: -1.34,
    image: "",
  },
  {
    name: "Stellar",
    symbol: "XLM",
    price: 0.1182,
    change24h: 0.73,
    image: "",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    price: 9.27,
    change24h: 6.15,
    image: "",
  },
  {
    name: "Monero",
    symbol: "XMR",
    price: 163.2,
    change24h: -0.44,
    image: "",
  },
];

const seed = async () => {
  await connectDB();

  const existing = await Crypto.countDocuments();
  if (existing > 0) {
    console.log(
      `Database already has ${existing} crypto entries. Skipping seed.\nTo re-seed, drop the cryptos collection first.`
    );
    process.exit(0);
  }

  await Crypto.insertMany(CRYPTOS);
  console.log(`✓ Seeded ${CRYPTOS.length} cryptocurrencies.`);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
