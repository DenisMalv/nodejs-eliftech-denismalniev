const { Schema, model } = require("mongoose");
const Joi = require("joi");

const orderSchema = Schema(
  {
    number: {
      type: Number,
      required: [true, "Number is required"],
    },
    contact: {
      type: Object,
      required: [true, "contact is required"],
      // unique: true,
    },
    order: {
      type: Array,
      required: [true, "order is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "totalPrice is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Order = model("order", orderSchema);

const joiAddOrderSchema = Joi.object({
  contact: Joi.object().required(),
  order: Joi.array().required(),
  totalPrice: Joi.number(),
});
const joigetOrdersSchema = Joi.object({
  email: Joi.string(),
  phone: Joi.number(),
});

const joiUserLoginSchema = Joi.object({
  // email: Joi.string().email().trim().required(),
  // phone: Joi.number().trim().required(),
});

module.exports = {
  Order,
  joiAddOrderSchema,
  joiUserLoginSchema,
  joigetOrdersSchema,
};
