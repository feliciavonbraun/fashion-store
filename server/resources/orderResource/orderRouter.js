const express = require('express');
const orderRouter = express.Router();
const controller = require('./orderController');
const { adminSecure, secure } = require('../../middleware/auth');

orderRouter
    .get('/api/order/:id',
        controller.getOrder
    );

/* LOGGED IN */
orderRouter
    .get('/api/order/user/:id',
        secure,
        controller.getUserOrders
    );
orderRouter
    .post('/api/order',
        secure,
        controller.newOrder
    );

/* ADMIN */
orderRouter
    .get('/api/order',
        adminSecure,
        controller.getAllOrders
    );
orderRouter
    .put('/api/order/:id',
        adminSecure,
        controller.updateOrder
    );

module.exports = orderRouter;
