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
    restoraunt: {
      type: String,
      required: [true, "Set restoraunt for item"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaPizzadayAll = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  price: Joi.number().required(),
  img: Joi.string().trim().required(),
  restoraunt: Joi.string().trim().required(),
});

const Products = model("db_product", pizzadaySchema);

module.exports = {
  Products,
  joiSchemaPizzadayAll,
};
