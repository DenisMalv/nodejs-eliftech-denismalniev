const { Schema, model } = require("mongoose");
const Joi = require("joi");

const kfsiSchema = Schema(
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

const joiSchemaKfsAll = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});

const kfsItem = model("kfsi_db_item", kfsiSchema);

module.exports = {
  kfsItem,
  joiSchemaKfsAll,
};
