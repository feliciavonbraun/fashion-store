const express = require('express');
const userRouter = express.Router();
const controller = require('./userController');
const { adminSecure, secure, userSecure } = require('../../middleware/auth');

// Lägg till secure
userRouter.post('/api/user/register', controller.registerUser);
userRouter.post('/api/user/login', controller.loginUser);
userRouter.delete('/api/user/logout', secure, controller.logoutUser);
userRouter.get('/api/user/auth', userSecure, controller.getLoggedinUser);

/* ADMIN STUFF */
userRouter.get('/api/user/admin', adminSecure, controller.getAllAdminRequests);
userRouter.put('/api/user/admin', adminSecure, controller.handleAdminRequest);

module.exports = userRouter;
