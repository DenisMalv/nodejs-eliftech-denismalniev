const { Products } = require("../../models/db_products");
const { Conflict } = require("http-errors");

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
  const { _id } = req.user;
  console.log(req.body);
  console.log(req.body.email);
  if (!req.body.favorite) req.body.favorite = false;
  const item = await Products.findOne({
    email: req.body.email,
    owner: _id,
  }).exec();
  console.log("contact", item);
  if (item) {
    throw new Conflict("Contact already in data");
  }
  const data = await Products.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

const updateItem = async (req, res) => {
  const { contactId } = req.params;
  const data = await Products.findByIdAndUpdate(contactId, req.body, {
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
