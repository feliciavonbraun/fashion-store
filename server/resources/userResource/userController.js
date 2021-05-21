const UserModel = require('./userModel');

exports.getAllUsers = async (req, res) => {
    const docs = await UserModel.find({});
    res.status(200).json(docs);
};

exports.getOneUser = async (req, res) => {
    const { _id } = req.body;
    const doc = await UserModel.find({ _id: _id });
    res.status(200).json(doc);
};

exports.registerUser = async (req, res) => {
    const doc = await UserModel.create(req.body);
    res.status(201).json(doc);
};

exports.loginUser = async (req, res) => {

};

exports.logoutUser = async (req, res) => {

};