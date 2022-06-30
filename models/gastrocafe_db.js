const { Schema, model } = require("mongoose");
const Joi = require("joi");

const gastrocafeSchema = Schema(
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

const joiSchemaGastrocafeAll = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});

const gastrocafeItem = model("gastrocafe_db_item", gastrocafeSchema);

module.exports = {
  gastrocafeItem,
  joiSchemaGastrocafeAll,
};
