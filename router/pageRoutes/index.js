const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/',(req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('index',{ title: 'API', userInfo })
})

router.get('/login',(req, res) => {
    res.render('login',{ title: '登录' })
})

router.get('/edit-page', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('edit', { title: '编辑文章', userInfo })
})

router.get('/error', (req, res) => {
    res.render('error', { title: '404 Not Found' })
})

router.get('/article-list', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('article-list', { title: '文章列表', userInfo })
})

router.get('/drafts', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('drafts', { title: '草稿箱', userInfo })
})

router.get('/author-library', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('author', { title: '作者库', userInfo })
})

router.get('/article-deleted', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('article-deleted', { title: '已删除', userInfo })
})

router.get('/documents/email', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('./documents/email', { title: '邮件API文档', userInfo })
})
router.get('/documents/article', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('./documents/article', { title: '文章API文档', userInfo })
})

router.get('/websites', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('websites', { title: '我的网站', userInfo })
})

router.get('/setting', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('setting', { title: '设置', userInfo })
})

router.get('/columns', (req, res) => {
    let userInfo = req.headers.userInfo;
    res.render('columns', { title: '我的栏目', userInfo })
})

module.exports = router;