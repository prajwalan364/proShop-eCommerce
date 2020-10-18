const express = require('express');

const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router
	.route('/')
	.get(productController.getProducts)
	.post(protect, admin, productController.createProduct);

router.route('/top').get(productController.getToproducts);

router
	.route('/:id')
	.get(productController.getProduct)
	.put(protect, admin, productController.updateProduct)
	.delete(protect, admin, productController.deleteProduct);

router
	.route('/:id/reviews')
	.post(protect, productController.createProductReview);

module.exports = router;
