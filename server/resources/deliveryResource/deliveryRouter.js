const express = require("express");
const router = express.Router();
const controller = require("./deliveryController");

router.get("/api/delivery", controller.getAllDeliveryOptions);
router.get("/api/delivery/:id", controller.getDeliveryOption);
router.post("/api/delivery/:id", controller.newDeliveryOption);

module.exports = router;
