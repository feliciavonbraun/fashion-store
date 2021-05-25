const UserModel = require('./userModel');
const bcrypt = require('bcrypt');

/* REGISTER USER */
exports.registerUser = async (req, res) => {
    try {
        const emailExist = await UserModel.findOne({ email: req.body.email });

        if (emailExist) {
            res.status(400).json(false);
        } else {
            const password = await bcrypt.hash(req.body.password, 5);
            const user = new UserModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: password,
                role: 'user',
                adminRequest: req.body.adminRequest,
            });

            await user.save();
            res.status(201).json(true);
        }
    } catch (error) {
        console.log(error);
    }
};

/* LOG IN USER AND SET COOKIE */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).json('Incorrect e-mail or password');
    }

    /* FRÅN CLIENT, FÖRFRÅGAN OM ATT BLI ADMIN */
    if (user.adminRequest == true) {
        res.status(400).json('Pending admin request');
    }

    req.session.id = user.id;
    req.session.email = user.email;
    req.session.role = user.role;

    res.status(200).json(user);
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
/* GET ALL ADMIN REQUESTS */
exports.getAllAdminRequests = async (req, res) => {
    const allPendingRequests = await UserModel.find({ adminRequest: true });
    res.status(200).json(allPendingRequests);
};

/* RESPONSE TO ADMIN REQUEST */
exports.handleAdminRequest = async (req, res) => {
    const { _id, role, firstname } = req.body;

    await UserModel.updateOne(
        { _id: _id },
        { role: role, adminRequest: false }
    );
    res.status(202).json(`${firstname}'s role: ${role}`);
};
