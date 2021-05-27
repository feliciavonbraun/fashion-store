const express = require('express');
const productRouter = express.Router();
const controller = require('./productController');
const { adminSecure, secure } = require('../../middleware/auth');
const { body } = require('express-validator');

productRouter.get('/api/product', controller.getAllProducts);
productRouter.get('/api/product/category', controller.getCategories);
productRouter.get('/api/product/category/:category', controller.getCategoryProducts);
productRouter.get('/api/product/:id', controller.getProduct);

/* ADMIN */
productRouter
    .post('/api/product',
        body('titel').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('imageUrl').not().isEmpty(),
        body('category').not().isEmpty(),
        body('qty').not().isEmpty(),
        adminSecure,
        controller.newProduct
    );
productRouter
    .put('/api/product/:id',
        adminSecure,
        controller.updateProduct
    );
productRouter
    .delete('/api/product/:id',
        adminSecure,
        controller.deleteProduct
    );

module.exports = productRouter;
