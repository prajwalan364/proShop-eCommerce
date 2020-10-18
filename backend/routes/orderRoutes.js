const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router
	.route('/')
	.post(protect, orderController.addOrderItems)
	.get(protect, admin, orderController.getOrders);
router.route('/myorders').get(protect, orderController.getMyOrders);
router.route('/:id').get(protect, orderController.getOrderById);
router.route('/:id/pay').put(orderController.updateOrderToPaid);
router
	.route('/:id/deliver')
	.put(protect, admin, orderController.updateOrderToDelivered);

module.exports = router;
