const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const contactsValidation = require("../../middlewares/validation");
const userIsAuth = require("../../middlewares/userIsAuth");
const { joiSchemaPizzadayAll } = require("../../models/db_products");
const { productsControllers: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.listItems));

router.get("/:itemId", controllerWrapper(ctrl.getItemById));

router.delete("/:itemId", userIsAuth, controllerWrapper(ctrl.removeItem));

router.post(
  "/",
  userIsAuth,
  contactsValidation(joiSchemaPizzadayAll),
  controllerWrapper(ctrl.addItem)
);

router.put(
  "/:itemId",
  userIsAuth,
  contactsValidation(joiSchemaPizzadayAll),
  controllerWrapper(ctrl.updateItem)
);

module.exports = router;
