const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const contactsValidation = require("../../middlewares/validation");
const userIsAuth = require("../../middlewares/userIsAuth");
const { joiSchemaMacdonnyAll } = require("../../models/macdonny_db");
const { macdonnyControllers: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.listItems));

router.get("/:itemId", controllerWrapper(ctrl.getItemById));

router.delete("/:itemId", userIsAuth, controllerWrapper(ctrl.removeItem));

router.post(
  "/",
  userIsAuth,
  contactsValidation(joiSchemaMacdonnyAll),
  controllerWrapper(ctrl.addItem)
);

router.put(
  "/:itemId",
  userIsAuth,
  contactsValidation(joiSchemaMacdonnyAll),
  controllerWrapper(ctrl.updateItem)
);

module.exports = router;
