const { kfsItem } = require("../../models/kfs_db");
const { Conflict } = require("http-errors");

const listItems = async (req, res) => {
  // const { _id } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  // const options = { owner: _id, favorite: favorite };
  // if (options.favorite === undefined) {
  //   delete options.favorite;
  // }
  // .populate("owner", "_id email");

  const data = await kfsItem.find({}, "", {
    skip,
    limit: Number(limit),
  });
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const getItemById = async (req, res) => {
  const { itemId } = req.params;
  const data = await kfsItem.findById(itemId);
  res.json({ status: "success", code: 200, data });
};

const removeItem = async (req, res) => {
  const { itemId } = req.params;
  await kfsItem.findByIdAndDelete(itemId);
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
  const item = await kfsItem
    .findOne({
      email: req.body.email,
      owner: _id,
    })
    .exec();
  console.log("contact", item);
  if (item) {
    throw new Conflict("Contact already in data");
  }
  const data = await kfsItem.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const data = await kfsItem.findByIdAndUpdate(itemId, req.body, {
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
