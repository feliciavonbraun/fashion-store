const express = require('express');
const orderRouter = express.Router();
const controller = require('./orderController');

orderRouter.get('/api/order', controller.getAllOrders);
orderRouter.get('/api/order/:id', controller.getOneOrder);
orderRouter.post('/api/order', controller.newOrder);
orderRouter.put('/api/order/:id', controller.updateOrder);

module.exports = orderRouter;