const Product = require("../models/product");
const asyncWrapper = require("../middleware/async");

// get all products
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products, nbHits: products.length });
});

// get specific products
const getProduct = asyncWrapper(async (req, res) => {
  const { featured, company, name, sort, price, fields } = req.query;
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
  if (price) {
    queryObject.price = price;
  }
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //get selected fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
});

module.exports = {
  getAllProducts,
  getProduct,
};
