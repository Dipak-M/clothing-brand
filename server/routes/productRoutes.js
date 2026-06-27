const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

const { protect,
    admin,
 } = require("../middleware/authMiddleware");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected (for now)
router.post("/", protect, admin,  createProduct);

module.exports = router;