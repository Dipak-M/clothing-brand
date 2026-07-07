const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// Public
router.get("/", getCategories);

// Admin
router.post("/", protect, admin, createCategory);

module.exports = router;