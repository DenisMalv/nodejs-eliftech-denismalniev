const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/users");
const orderRouter = require("./routes/api/orders");
const productsRouter = require("./routes/api/products");
// const macdonnyRouter = require("./routes/api/macdonny");
// const kfsiRouter = require("./routes/api/kfs");
// const pizzadayRouter = require("./routes/api/pizzaday");
// const gastrocafeRouter = require("./routes/api/gastrocafe");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productsRouter);
// app.use("/api/macdonny", macdonnyRouter);
// app.use("/api/kfs", kfsiRouter);
// app.use("/api/pizzaday", pizzadayRouter);
// app.use("/api/gastrocafe", gastrocafeRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Page Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error", statusOperation, code } = err;
  res.status(status).json({ message, statusOperation, code });
});

module.exports = app;
