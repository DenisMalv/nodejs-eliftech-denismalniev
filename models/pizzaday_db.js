const { Schema, model } = require("mongoose");
const Joi = require("joi");

const pizzadaySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for item"],
    },
    price: {
      type: Number,
      required: [true, "Set price for item"],
    },
    img: {
      type: String,
      required: [true, "Set image for item"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaPizzadayAll = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});

const pizzadayItem = model("pizzaday_db_item", pizzadaySchema);

module.exports = {
  pizzadayItem,
  joiSchemaPizzadayAll,
};
