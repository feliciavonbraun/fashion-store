const { ImageModel } = require('./imageModel');


exports.newImage = async function(req, res, next) {
    try {
        const newImage = new Image({
            Image: req.file.path
        })
        await newImage.save();
        res.json(req.file.path)
    } catch(error) {
        next()
    }
}