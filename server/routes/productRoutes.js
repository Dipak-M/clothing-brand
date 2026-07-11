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

const upload = require("../middleware/uploadMiddleware");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected
router.post(
  "/",
  protect,
  admin,
  upload.array("images", 5),
  productValidationRules,
  validate,
  createProduct
);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;