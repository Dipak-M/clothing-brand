const Product = require("../models/Product");



// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
console.log("FILES:", req.files);
    const images = req.files
  ? req.files.map(file => file.path)
  : [];

const product = await Product.create({
  ...req.body,
  images,
  createdBy: req.user._id,
});

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get All Products
// @route   GET /api/products
// @access  Public
// @desc    Get All Products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      gender,
      featured,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};

    // Search
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Gender
    if (gender) {
      query.gender = gender;
    }

    // Featured
    if (featured) {
      query.featured = featured === "true";
    }

    // Price Range
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);

      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;

// Total matching products
const totalProducts = await Product.countDocuments(query);

// Sorting
let sortOption = "-createdAt"; // Default: newest first

if (req.query.sort) {
  sortOption = req.query.sort;
}

// Fetch paginated products
const products = await Product.find(query)
  .populate("category")
  .populate("createdBy", "name email")
  .sort(sortOption)
  .skip(skip)
  .limit(limit);

    res.status(200).json({
  success: true,
  page,
  pages: Math.ceil(totalProducts / limit),
  count: totalProducts,
  products,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Single Product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    Object.assign(product, req.body);

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};