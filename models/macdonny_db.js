const { Schema, model } = require("mongoose");
const Joi = require("joi");

const mcdonnySchema = Schema({
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
});

const joiSchemaMacdonnyAll = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});

const McdonnyItem = model("macdonny_db_item", mcdonnySchema);

module.exports = {
  McdonnyItem,
  joiSchemaMacdonnyAll,
};
