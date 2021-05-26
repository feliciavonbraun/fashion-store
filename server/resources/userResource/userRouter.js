const express = require('express');
const userRouter = express.Router();
const controller = require('./userController');
const { adminSecure, secure } = require('../../middleware/auth');

// Lägg till secure
userRouter.post('/api/user/register', controller.registerUser);
userRouter.post('/api/user/login', controller.loginUser);
userRouter.delete('/api/user/logout', secure, controller.logoutUser);
userRouter.get('/api/user/auth', secure, controller.getLoggedinUser);

/* ADMIN STUFF */
userRouter.get('/api/user/admin', adminSecure, controller.getAllAdminRequests);
userRouter.patch('/api/user/admin', adminSecure, controller.handleAdminRequest);

module.exports = userRouter;
