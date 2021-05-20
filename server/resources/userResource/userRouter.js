express = require('express');
const userRouter = express.Router();
const controller = require('./userController');

userRouter.get('/api/user', controller.getAllUsers);
userRouter.get('/api/user/:id', controller.getOneUser);
userRouter.post('/api/user/register', controller.registerUser);
userRouter.post('/api/user/login', controller.loginUser);
userRouter.delete('/api/user/logout', controller.logoutUser);

// ska det va usee emellan api/login osv ?????

module.exports = userRouter; 