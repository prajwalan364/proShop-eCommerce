const express = require('express');

const { protect, admin } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router
	.route('/')
	.post(userController.registerUser)
	.get(protect, admin, userController.getUsers);

router.route('/login').post(userController.authUser);
router
	.route('/profile')
	.get(protect, userController.getUserprofile)
	.put(protect, userController.updateUserProfile);
router
	.route('/:id')
	.delete(protect, admin, userController.deleteUser)
	.get(protect, admin, userController.getUserByID)
	.put(protect, admin, userController.updateUser);

module.exports = router;
