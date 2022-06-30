const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const contactsValidation = require("../../middlewares/validation");
const userIsAuth = require("../../middlewares/userIsAuth");
const { joiSchemaGastrocafeAll } = require("../../models/gastrocafe_db");
const { gastrocafeControllers: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.listItems));

router.get("/:itemId", controllerWrapper(ctrl.getItemById));

router.delete("/:itemId", userIsAuth, controllerWrapper(ctrl.removeItem));

router.post(
  "/",
  userIsAuth,
  contactsValidation(joiSchemaGastrocafeAll),
  controllerWrapper(ctrl.addItem)
);

router.put(
  "/:itemId",
  userIsAuth,
  contactsValidation(joiSchemaGastrocafeAll),
  controllerWrapper(ctrl.updateItem)
);

module.exports = router;
