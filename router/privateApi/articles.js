const express = require('express');
const router = express.Router();
const { selectOneWebsite } = require('../../service/website.service');
const { selectOneColumns } = require('../../service/columns.service');

const { createArticle, updateArticle, selectAllArticle, selectArticleByColumnsID, selectArticleByArticleID, deleteArticle } = require('../../service/article.service');
const { success, fail } = require('../response');
const changeParams = require('../../utils/changeParams');

const authMiddleware = require('../../middleware/auth');

const middleware = async (req, res, next) => {

    let { columns_id, website_id } = req.body;

    let websiteResults = await selectOneWebsite(website_id);
    if (websiteResults === 'error') {
        fail(res, 5000, '查询网站信息失败', 500);
        return;
    }

    let columnsResults = await selectOneColumns(columns_id);

    if (columnsResults === 'error') {
        fail(res, 5000, '查询栏目信息失败', 500);
        return;
    }

    if (!websiteResults) {
        fail(res, 4040, '未找到相关网站！请添加后再试！');
        return;
    } else if (!columnsResults) {
        fail(res, 4040, '未找到相关栏目信息！请添加后再试！');
        return;
    }


    next();
}

/**
 * 查询该网站下所有文章
 */
router.get('/all', async (req, res) => {
    let { website_id, status, page, limit } = req.query;
    page = isNaN(Number(page)) ? 1 : Number(page);
    limit = isNaN(Number(limit)) ? 20 : Number(limit);
    status = status === 'deleted' ? status : status === 'pending' ? status : 'done';
    let results = await selectAllArticle(website_id, page, limit, status);
    if (results === 'error') {
        fail(res, 5000, '查询失败，请联系管理员！')
    } else if (results.count === 0) {
        fail(res, 4040, '未找到相关内容')
    } else {
        success(res, results, '查询成功')
    }
})

/**
 * 查询某篇文章
 */
router.get('/find', async (req, res) => {
    let { article_id } = req.query;

    let results = await selectArticleByArticleID(article_id);
    if (results === 'error') {
        fail(res, 5000, '查询失败');
    } else if (results == null) {
        fail(res, 4040, '未找到相关内容')
    } else {
        success(res, results, '查询成功！')
    }

})

/**
 * 查询某个类目下的文章
 */
router.get('/findbycolumns', async (req, res) => {
    let { columns_id, page, limit, status } = req.query;
    page = isNaN(Number(page)) ? 1 : Number(page);
    limit = isNaN(Number(limit)) ? 20 : Number(limit);
    status = status === 'deleted' ? status : status === 'pending' ? status : 'done';
    let results = await selectArticleByColumnsID(columns_id, page, limit, status);

    if (results === 'error') {
        fail(res, 5000, '查询失败，请联系管理员！')
    } else if (results.count === 0) {
        fail(res, 4040, '未找到该类目，请创建后再试！')
    } else {
        success(res, results, '查询成功')
    }


})

/**
 * 创建一篇文章
 */
router.post('/create', authMiddleware, middleware, async (req, res) => {
    if (req.body.state != 'fail' && req.body.state != 'pending' && req.body.state != 'done') {
        req.body.state = 'done'
    }
    let results = await createArticle(req.body);
    if (results === 'error') {
        fail(res, 5000, '创建文章失败')
    } else {
        success(res, results, '创建成功')
    }
})

/**
 * 更新一篇文章
 */
router.put('/update', authMiddleware, async (req, res) => {
    let { article_id } = req.body;
    let params = changeParams('article_id', req.body);
    let results = await updateArticle(article_id, params);

    if (results === 'error') {
        fail(res, 5000, '更新失败');
    } else if (results[0] > 0) {
        success(res, results, "更新成功")
    } else {
        fail(res, 4040, '未找到该篇文章')
    }


})

/**
 * 删除一篇文章
 */
router.delete('/delete', authMiddleware, async (req, res) => {
    let { article_id } = req.body;

    let results = await deleteArticle(article_id);

    if (results === 'error') {
        fail(res, 5000, '删除文章失败')
    }
    else if (results[0] == 0) {
        fail(res, 4040, '未找到该篇文章')

    }
    else {
        success(res, results, '删除文章成功')
    }
})
module.exports = router;