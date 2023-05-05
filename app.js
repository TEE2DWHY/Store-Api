require("dotenv").config();
const express = require("express");
const app = express();
const product = require("./routes/products");
const connectDb = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
//middleWear
app.use("/api/v1", product);
//handle wrong routes
app.use(notFound);
//handle errors
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is running on port 4000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
