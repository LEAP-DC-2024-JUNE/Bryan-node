const dotenv = require("dotenv").config({ path: "./configs/.env" });
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
