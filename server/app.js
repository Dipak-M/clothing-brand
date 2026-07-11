const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes");
const { notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");

const categoryRoutes = require("./routes/categoryRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Clothing Brand API");
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;