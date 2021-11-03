const path = require('path');
const websiteRouter = require('express').Router();
const { createWebsite, updateWebsite, selectWebsite, selectAllWebsite } = require('../../service/website.service')

const { success, fail } = require('../response');
const authMiddleware = require('../../middleware/auth');
websiteRouter.post('/add',authMiddleware, async (req, res) => {
    let { website } = req.body;

    let results = await createWebsite(website);

    if (results === 'error') {
        fail(res, 5000, '添加失败，请联系程序员');
    } else {
        success(res, results, '添加网站成功');
    }

})

websiteRouter.put('/update',authMiddleware, async (req, res) => {
    const { website_id, website } = req.body;
    
    let results = await updateWebsite(website_id, { website });

    if (results === 'error') {
        fail(res, 5000, '更新失败，请联系程序员');
    } else {
        success(res, results, '更新成功')
    }
})

websiteRouter.get('/', async (req, res) => {
    let { page, limit } = req.query;

    
    page = isNaN(Number(page)) ? 0 : Number(page);
    limit = isNaN(Number(limit)) ? 20 : Number(limit);

    let results = await selectWebsite(page, limit);

    if (results === 'error') {
        fail(res, 5000, '查询失败，请联系程序员')
    } else {
        
        success(res, results, '查询成功')
    }
})


websiteRouter.get('/all', async (req, res) => {
   
    let results = await selectAllWebsite();

    if (results === 'error') {
        fail(res, 5000, '查询失败，请联系程序员')
    } else {

        success(res, results, '查询成功')
    }
})

module.exports = websiteRouter;