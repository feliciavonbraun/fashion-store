const express = require("express");
const deliveryRouter = express.Router();
const controller = require("./deliveryController");

deliveryRouter
    .get("/api/delivery",
        controller.getAllDeliveryMethods
    );

module.exports = deliveryRouter;
