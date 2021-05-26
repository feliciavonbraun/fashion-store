const express = require('express');
cookieRouter = express.Router();
const { secure } = require('../../middleware/auth');

cookieRouter.get('/cookie-session', secure, (req, res) => {
    const role = req.session.role
    res.status(200).json(role)
})

module.exports = cookieRouter;