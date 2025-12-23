const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.get('/', userController.logoutUser);


module.exports = router;