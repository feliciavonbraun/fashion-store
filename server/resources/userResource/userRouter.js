express = require('express');
const userRouter = express.Router();
const controller = require('./userController');

userRouter.post('/api/user/register', controller.registerUser);
userRouter.post('/api/user/login', controller.loginUser);
userRouter.delete('/api/user/logout', controller.logoutUser);

/* ADMIN STUFF */
userRouter.get('/api/user/admin', controller.getAllRequests);


module.exports = userRouter; 