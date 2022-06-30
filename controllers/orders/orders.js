// const { Conflict, Unauthorized } = require("http-errors");

const { Order } = require("../../models/orders");

const listOrders = async (req, res) => {
  const { email, phone } = req.body;
  console.log("req.body", req.body);
  const data = await Order.find({
    "contact.email": email,
    "contact.phone": phone,
  });
  console.log("data", data);

  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const addOrder = async (req, res) => {
  const data = await Order.create({ ...req.body, number: Date.now() });
  res.status(201).json({
    status: "success",
    code: 201,
    responseData: {
      orderId: data._id,
      orderNumber: data.number,
    },
  });
};

module.exports = {
  listOrders,
  addOrder,
};
