const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const contactsValidation = require("../../middlewares/validation");
const userIsAuth = require("../../middlewares/userIsAuth");
const { joiSchemaKfsAll } = require("../../models/kfs_db");
const { kfsControllers: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.listItems));

router.get("/:itemId", controllerWrapper(ctrl.getItemById));

router.delete("/:itemId", userIsAuth, controllerWrapper(ctrl.removeItem));

router.post(
  "/",
  userIsAuth,
  contactsValidation(joiSchemaKfsAll),
  controllerWrapper(ctrl.addItem)
);

router.put(
  "/:itemId",
  userIsAuth,
  contactsValidation(joiSchemaKfsAll),
  controllerWrapper(ctrl.updateItem)
);

module.exports = router;
