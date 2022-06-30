const { Products } = require("../../models/db_products");

const listItems = async (req, res) => {
  const data = await Products.find({});
  console.log("data", data);
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const getItemById = async (req, res) => {
  const { itemId } = req.params;
  const data = await Products.findById(itemId);
  res.json({ status: "success", code: 200, data });
};

const removeItem = async (req, res) => {
  const { itemId } = req.params;
  await Products.findByIdAndDelete(itemId);
  res.json({
    message: "contact successfully deleted",
    statusOperation: "success",
  });
};

const addItem = async (req, res) => {
  const data = await Products.create({ ...req.body, number: Date.now() });
  res.status(201).json({
    status: "success",
    code: 201,
    responseData: {
      data
    },
  });
};

const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const data = await Products.findByIdAndUpdate(itemId, req.body, {
    new: true,
  });
  res.json({
    message: "contact successfully edit",
    statusOperation: "success",
    data,
  });
};

module.exports = {
  listItems,
  getItemById,
  removeItem,
  addItem,
  updateItem,
};
