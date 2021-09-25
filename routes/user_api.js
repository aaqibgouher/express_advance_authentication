const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

// route for dashboard
router.post('/', AuthMiddleware.checkToken, UserController.dashboard);

// route for register
router.post('/register', UserController.register);

// route for login
router.post('/login', UserController.login);

// route for logout
router.post('/logout', AuthMiddleware.checkToken, UserController.logout);

module.exports = router;