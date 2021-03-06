const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const orderRouter = require("./routes/api/orders");
const productsRouter = require("./routes/api/products");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRouter);
app.use("/api/products", productsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Page Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error", statusOperation, code } = err;
  res.status(status).json({ message, statusOperation, code });
});

module.exports = app;
