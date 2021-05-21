const UserModel = require('./userModel');
const bcrypt = require('bcrypt');


/* REGISTER USER OR admin */
exports.registerUser = async (req, res) => {
    try {
        
        const password = await bcrypt.hash(req.body.password, 5);
        const user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            role: 'user',
            adminRequest: req.body.adminRequest
        });

        await user.save()
        res.status(201).json('You are registered!')
    } catch (error) {
        console.log(error);
        res.status(400).json('Email already exists')
    }

};

/* LOG IN USER AND SET COOKIE */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email })
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).json({message: 'Incorrect email or password'});
        return;
    }

    /* FRÅN CLIENT, FÖRFRÅGAN OM ATT BLI ADMIN */
    if (req.body.adminRequest) {
        res.status(400).json('Waiting for response from Admin');
        return;
    }

    req.session.id = user.id;
    req.session.email = user.email;
    req.session.role = user.role;

    res.status(200).json({message: 'You are logged in'})
};

/* LOG OUT SESSION */
exports.logoutUser = async (req, res) => {
    if (!req.session.id) {
        res.status(400).json('You are already logged out');
        return;
    }
    req.session = null;
    res.status(200).json('You are logged out!');
};


/* ADMIN STUFF */
exports.getAllRequests = async (req, res) => {
    const allPendingRequests = await UserModel.find({ adminRequest: true });
    res.status(200).json(allPendingRequests);
}



function secure(req, res, next) {
    if (req.session.email) {
        next()
    } else {
        res.status(401).json('You are not logged in')
    }
}

function authorized(user) {
    return [
        secure,
        (req, res, next) => {
            if (req.session.role === 'admin') {
                next();
            } else {
                res.status(403).json('You are not authorized')
            }
        }
    ];
}