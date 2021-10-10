const express = require('express');

const router = express.Router();
const path = require('path');

const marked = require('marked');

const fs = require('fs');
const hljs = require('highlight.js');

marked.setOptions({
    highlight: (code) => hljs.highlightAuto(code).value
})

function renderMD(req, res, templatePath, filename, title) {
    let userInfo = req.headers.userInfo;
    let str = '';
    let filePath = path.resolve(__dirname, '../../documents/' + filename)

    fs.readFile(filePath, (err, data) => {
        if (err) {
            str = err;
        } else {
            str = marked(data.toString());
        }

        res.render(templatePath, { title: title, userInfo, str })
    })
}

router.get('/',(req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('index',{ title: 'API', userInfo });
})

router.get('/login',(req, res) => {
    res.render('login',{ title: '登录 - Open API' })
})

router.get('/edit-page', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('edit', { title: '编辑文章 - Open API', userInfo })
})

router.get('/error', (req, res) => {
    res.render('error', { title: '404 Not Found - Open API' })
})

router.get('/article-list', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('article-list', { title: '文章列表 - Open API', userInfo })
})

router.get('/drafts', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('drafts', { title: '草稿箱 - Open API', userInfo })
})

router.get('/author-library', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('author', { title: '作者库 - Open API', userInfo })
})

router.get('/article-deleted', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('article-deleted', { title: '已删除 - Open API', userInfo })
})

router.get('/documents/email', (req, res) => {
    
    
    renderMD(req, res, './documents/email', 'Email.md', '邮件API文档 - Open API')
    
})
router.get('/documents/article', (req, res) => {
   
    renderMD(req,res, './documents/article','Articles.md', '文章API文档 - Open API' )
})

router.get('/documents/upload', (req, res) => {
    
    renderMD(req, res, './documents/upload','Upload.md', '上传API文档 - Open API')
})

router.get('/websites', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('websites', { title: '我的网站 - Open API', userInfo })
})



router.get('/columns', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('columns', { title: '我的栏目 - Open API', userInfo })
})

module.exports = router;