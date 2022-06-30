const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const { productsControllers: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.listItems));

router.get("/:itemId", controllerWrapper(ctrl.getItemById));

router.delete("/:itemId",controllerWrapper(ctrl.removeItem));

router.post(
  "/",
  controllerWrapper(ctrl.addItem)
);

router.put(
  "/:itemId",
  controllerWrapper(ctrl.updateItem)
);

module.exports = router;
