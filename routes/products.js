const router = require("express").Router();
const { getAllProducts, getProduct } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/product").get(getProduct);

module.exports = router;
