const { body, validationResult } = require("express-validator");

// Validation rules
const productValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("brand")
    .notEmpty()
    .withMessage("Brand is required"),
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  productValidationRules,
  validate,
};