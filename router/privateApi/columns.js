const express = require('express');

const router = express.Router();

const { success, fail } = require('../response');
const { createColumns, updateColumns, selectAllColumns } = require('../../service/columns.service');
const changeParmas = require('../../utils/changeParams');
const authMiddleware = require('../../middleware/auth');
router.post('/create', authMiddleware, async (req, res) => {
    let { website_id, title } = req.body;

    let results = await createColumns(website_id, title);

    if (results === 'error') {
        fail(res, 5000, '添加栏目失败')
    } else {
        success(res, results, '添加栏目成功' )
    }
})

router.put('/update',authMiddleware, async (req, res) => {
    let { columns_id } = req.body;
    let params = changeParmas('columns_id', req.body);

    let results = await updateColumns(columns_id, params);

    if (results === 'error') {
        fail(res, 5000, '更新失败')
    } else {
        success(res, results, '更新成功')
    }
})

router.get('/all', async (req, res) => {
    const { website_id } = req.query;

    let results = await selectAllColumns(website_id);

    if (results === 'error') {
        fail(res, 5000, '查询失败');
    } else {
        success(res, results, '查询成功')
    }

})



module.exports = router;