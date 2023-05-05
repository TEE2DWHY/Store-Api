require("dotenv").config();
const connectDB = require("./db/connect");
const product = require("./models/product");

const data = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await product.create(data);
    console.log("success");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
