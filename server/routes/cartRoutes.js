const express =require('express');
const router = express.Router();


const { addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", protect, addToCart);

// Get user's cart
router.get("/", protect, getCart);

// Update cart item quantity
router.put("/", protect, updateCartItem);

// Remove item from cart
router.delete("/:productId", protect, removeCartItem);

// clear cart
router.delete("/", protect, clearCart);


module.exports = router; 