const Product = require("../models/product");
const asyncWrapper = require("../middleware/async");

// get all products
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products, nbHits: products.length });
});

// get specific products
const getProduct = asyncWrapper(async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  const product = await Product.find(queryObject);
  res.status(200).json({ product, nbHits: product.length });
});

module.exports = {
  getAllProducts,
  getProduct,
};
