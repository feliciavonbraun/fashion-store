
const secure = (req, res, next) => {
    if (req.session.email) {
        next()
    } else {
        res.status(401).json('You are not logged in')
    }
}

const adminSecure = [
        secure,
        (req, res, next) => {
            if (req.session.role === 'admin') {
                next();
            } else {
                res.status(403).json('You are not authorized')
            }
        }
    ];

module.exports = {
    secure,
    adminSecure
}