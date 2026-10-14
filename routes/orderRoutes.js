const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.listOrders);
router.get('/orders', orderController.listOrders);
router.get('/orders/create', orderController.getCreateOrder);
router.post('/orders/create', orderController.postCreateOrder);
router.get('/orders/update/:id', orderController.getUpdateOrder);
router.post('/orders/update/:id', orderController.postUpdateOrder);
router.get('/orders/delete/:id', orderController.deleteOrder);

module.exports = router;
