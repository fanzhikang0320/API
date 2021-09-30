const router = require('express').Router();
const uploadMimetypes = process.env.MIMETYPE_WHITELIST;
const maxCount = process.env.MAXCOUNT;
const fileSize = process.env.FILESIZE;
const path = require('path');
const multer = require('multer');
const { fail } = require('../../router/response');
// 定制存储器
const storage = multer.diskStorage({
    // 定制存储位置，提前创建好对应文件目录
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/upload/images/articles'))
    },
    // 定制存储文件名称
    filename: (req, file, cb) => {
        let suffixArray = file.originalname.split('.');
        let ext = suffixArray[suffixArray.length - 1];
        cb(null, new Date().getTime() + '.' + ext );
    }
    
})

// 定制过滤器
const fileFilter = (req, file, cb) => {
    if (uploadMimetypes.includes(file.mimetype)) {
        cb(null, true) //允许接收
    } else {
        cb(null, false) //拒绝接收

        cb(new Error('不支持的图片类型')) //发送错误
    }
    
}
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: fileSize * 1024, //10Mb大小
        files: maxCount // 最多上传10个文件
    },
    fileFilter: fileFilter
 })

 const uploader = upload.single('upload')

router.post('/', (req, res) => {
    uploader (req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // 发生错误
            fail(res, 5000, 'Multer Error: ' + err, 500);
        } else if (err) {
            // 发生错误
            fail(res, 5000, '' + err, 500);
        } else {
            // 一切都好
            let { filename, path } = req.file;
            res.send({ fileName: filename, uploaded: 1, url: process.env.PATH_PREFIX + '/upload/images/articles/' + filename })
        }
        
    })
} )



module.exports = router;