const router = require('express').Router();
const { success, fail } = require('../response');

const { createAuthor, updateAuthor, deleteAuthor, selectAuthorInfo, selectAllAuthor, selectAllAuthorForPaging } = require('../../service/author.service');
const changeParams = require('../../utils/changeParams');
const authMiddleware = require('../../middleware/auth');
router.get('/find', async (req, res) => {
    let { author_id } = req.query;

    let results = await selectAuthorInfo(author_id);
    if (results === 'error') {
        fail(res, 5000, '查找失败')
    } else {

        if (results == null) {
            fail(res, 4040, '未找到相应信息')
        } else {
            success(res, results, '查询成功')
        }
        
    }
})

router.get('/all', async (req,res) => {
    let { page, limit } = req.query;
    page = isNaN(Number(page)) ? 1 : Number(page);
    limit = isNaN(Number(limit)) ? 20 : Number(limit);

    let results = await selectAllAuthorForPaging(page, limit);
    if (results === 'error') {
        fail(res, 5000, '获取失败，请联系管理员！')
    } else {
        success(res, results, '查询成功')
    }
})

router.get('/findall', async (req, res) => {
    let results = await selectAllAuthor();
    if (results === 'error') {
        fail(res, 5000, '查询失败');
    } else {
        success(res, results, '查询成功')
    }
})

router.put('/update', authMiddleware, async (req, res) => {
    let { author_id } = req.body;
    let params = changeParams('author_id', req.body);

    let results = await updateAuthor(author_id, params);

    if (results === 'error') {
        fail(res, 5000, '更新失败，请联系管理员')
    } else {

        if (results[0] < 1) {
            fail(res, 4040, '未找到相应信息')
        } else {
            success(res, results, '更新成功')
        }
       
    }

})


router.delete('/delete',authMiddleware, async (req, res) => {
    let { author_id } = req.body;

    let results = await deleteAuthor(author_id);
    if (results === 'error') {
        fail(res, 5000, '删除失败，请联系管理员')
    } else {
        if (results === 0) {
            fail(res, 4040, '未找到相应信息')
        } else {
            success(res, results, '删除成功')
        }
        
    }
})  

router.post('/create',authMiddleware, async (req, res) => {
    let { avatar, name, introduce } = req.body;

    let results = await createAuthor({ avatar, name, introduce });
    if (results === 'error') {
        fail(res, 5000, '添加失败');
    } else {
        success(res, results, '添加成功')
    }
    
})


module.exports = router;