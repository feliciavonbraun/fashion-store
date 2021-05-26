const express = require('express');
const router = express.Router();
const controller = require('./productController');
const { adminSecure, secure } = require('../../middleware/auth');

router.get('/api/product', controller.getAllProducts);
router.get('/api/product/category', controller.getCategories);
router.get('/api/product/category/:category', controller.getCategoryProducts);
router.get('/api/product/:id', controller.getProduct);

/* ADMIN */
router.post('/api/product', adminSecure, controller.newProduct);
router.put('/api/product/:id', adminSecure, controller.updateProduct);
router.delete('/api/product/:id', adminSecure, controller.deleteProduct);

module.exports = router;
