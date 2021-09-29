const express = require('express');

const router = express.Router();

const { success } = require('../response');

const uploadMiddle = require('../../middleware/uploadMiddleware');

router.post('/', uploadMiddle, (req, res) => {
    let filesArray = req.files;
    let pathArray = [];

    filesArray.forEach( file => {
        let { filename, mimetype, size } = file;

        let data = {
            src: '/upload/images/' + filename,
            size: size,
            mimetype: mimetype
        }

        pathArray.push(data)
    })
    
    success(res, pathArray, '上传成功')
})

module.exports = router;