const express = require('express');
const multer  = require('multer');
const controller = require('./imageController');
const imageRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '.uploads/')
    },
    filename: function(req, file, cb) {
        cb(null)
    }
})

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50}, 
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

imageRouter.post('/api/upload', upload.single('imageUrl'), controller.newImage);