const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const {
  productValidationRules,
  validate,
} = require("../validators/productValidator");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected
router.post(
  "/",
  protect,
  admin,
  productValidationRules,
  validate,
  createProduct
);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;