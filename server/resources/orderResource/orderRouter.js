const express = require('express');
const orderRouter = express.Router();
const controller = require('./orderController');
const { adminSecure, secure } = require('../../middleware/auth');

orderRouter.get('/api/order', controller.getAllOrders);
orderRouter.get('/api/order/:id', controller.getOrder);
orderRouter.get('/api/order/user/:id', controller.getUserOrders);
orderRouter.post('/api/order', controller.newOrder);
orderRouter.put('/api/order/:id', controller.updateOrder);

module.exports = orderRouter;
