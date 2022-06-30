const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    phone: {
      type: Number,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    orders: [],
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiUserRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.number().required(),

  token: [Joi.string(), Joi.number()],
});

const joiUserLoginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});

module.exports = {
  User,
  joiUserRegisterSchema,
  joiUserLoginSchema,
};
