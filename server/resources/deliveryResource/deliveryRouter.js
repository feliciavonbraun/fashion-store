const express = require("express");
const router = express.Router();
const controller = require("./deliveryController");

router.get("/api/delivery", controller.getAllDeliveryMethods);

module.exports = router;
