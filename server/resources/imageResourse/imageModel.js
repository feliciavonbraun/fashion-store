const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image: {typa: String}
});

const ImageModel = mongoose.model('imageUrl', ImageSchema);
module.exports = { ImageSchema, ImageModel }; 