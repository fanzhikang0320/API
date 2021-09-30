const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/',(req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('index',{ title: 'API', userInfo })
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
    let userInfo = req.headers.userInfo;
    res.render('./documents/email', { title: '邮件API文档 - Open API', userInfo })
})
router.get('/documents/article', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('./documents/article', { title: '文章API文档 - Open API', userInfo })
})

router.get('/documents/upload', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('./documents/upload', { title: '上传API文档 - Open API', userInfo })
})

router.get('/websites', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('websites', { title: '我的网站 - Open API', userInfo })
})

router.get('/setting', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('setting', { title: '设置 - Open API', userInfo })
})

router.get('/columns', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('columns', { title: '我的栏目 - Open API', userInfo })
})

module.exports = router;