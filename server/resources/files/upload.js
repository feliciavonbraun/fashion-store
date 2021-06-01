const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const uploadRouter = express.Router();

// uploadRouter.get('/api/upload', (req, res) => {
    
// }); 

// uploadRouter.post('/api/upload', upload.single('productImage'), (req, res, next) => {
//     console.log(req.file)
//     const image = req.file
//     res.status(201).send('bra')
// })
