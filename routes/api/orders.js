const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const userValidation = require("../../middlewares/validation");
// const userIsAuth = require("../../middlewares/userIsAuth");
const {
  joiAddOrderSchema,
  joigetOrdersSchema,
} = require("../../models/orders");
const { orderControllers: ctrl } = require("../../controllers");

router.post(
  "/",
  userValidation(joiAddOrderSchema),
  controllerWrapper(ctrl.addOrder)
);
router.post(
  "/userOrders",
  userValidation(joigetOrdersSchema),
  controllerWrapper(ctrl.listOrders)
);

router.get("/", controllerWrapper(ctrl.listOrders));

module.exports = router;

// {"contact":{
// "adress": "qweqrqw qweqw qqwe"
// "email": "qwe@mail.com"
// "name": "den"
// "phone": "123123123"
// "number": "1uA1L"},
// "order":[
// {"id": "62bbf996200aea2890b75229", "name": "mcdonny-hamburger", "price": 39, "restoraunt": "macdonny", "count": "4"},
// {"id": "62bbf996200aea2890b7522a", "name": "mcdonny-chiseburger", "price": 40, "restoraunt": "macdonny", "count": "3"}],
// "totalPrice": 276}
