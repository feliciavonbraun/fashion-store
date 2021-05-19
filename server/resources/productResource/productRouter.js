const express = require('express');
const router = express.Router();
const controller = require('./productController');

router.get('/api/product', controller.getAllProducts);
router.get('/api/product/:id', controller.getProduct);
router.post('/api/product', controller.newProduct);
router.put('/api/product/:id', controller.updateProduct);
router.delete('/api/product/:id', controller.deleteProduct);

module.exports = router;
