const express = require('express');
const { body } = require('express-validator');
const userRouter = express.Router();
const controller = require('./userController');
const { adminSecure, secure } = require('../../middleware/auth');

userRouter.post(
    '/api/user/register',
    body('firstname').not().isEmpty(),
    body('lastname').not().isEmpty(),
    body('email').isEmail(),
    body('password').not().isEmpty(),
    body('adminRequest').not().isEmpty(),
    controller.registerUser
);

userRouter.post(
    '/api/user/login',
    body('email').isEmail(),
    body('password').not().isEmpty(),
    controller.loginUser
);
userRouter.delete('/api/user/logout', secure, controller.logoutUser);
userRouter.get('/api/user/auth', secure, controller.getLoggedinUser);

/* ADMIN STUFF */
userRouter.get('/api/user/admin', adminSecure, controller.getAllAdminRequests);
userRouter.put('/api/user/admin', adminSecure, controller.handleAdminRequest);

module.exports = userRouter;
