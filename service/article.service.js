const sequelize = require('../models/db');
const {Op} = require('sequelize');
const articleModel = require('../models/article');
const columnsModel = require('../models/columns');
const websiteModel = require('../models/website');
const authorModel = require('../models/author');
const {sqlLogger} = require('../common/logger');
/**
 * 创建一篇文章
 */
const createArticle = async ({
                                 website_id,
                                 columns_id,
                                 keywords,
                                 title,
                                 subtitle,
                                 introduce,
                                 content,
                                 main_picture,
                                 state,
                                 author_id,
                                 date
                             }) => {
    try {
        const results = await sequelize.transaction(async (t) => {

            const ins = await articleModel.create({
                website_id,
                columns_id,
                keywords,
                title,
                subtitle,
                introduce,
                content,
                main_picture,
                state,
                date,
                author_id
            }, {transaction: t});

            return ins.toJSON();
        })

        return results;

    } catch (error) {
        sqlLogger.error(error);
        return 'error'
    }
}

/**
 * 更新某篇文章内容
 * @param {*} article_id
 * @param {*} params
 * @returns
 */
const updateArticle = async (article_id, params) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await articleModel.update({
                ...params
            }, {
                where: {
                    article_id: article_id
                },
                transaction: t
            });
            return ins;
        })
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return 'error'
    }
}

/**
 * 根据某篇文章id删除某篇文章
 *
 * 修改该篇文章的状态
 * @param {*} article_id
 */
const deleteArticle = async (article_id) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await articleModel.update(
                {
                    state: 'deleted'
                },
                {
                    where: {
                        article_id: article_id
                    },
                    transaction: t
                }
            );
            return ins;
        })
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return 'error'
    }
}

/**
 * 分页查询该网站下的所有的文章
 * @param {*} website_id
 * @param {*} page
 * @param {*} limit
 */
const selectAllArticle = async (website_id, page = 1, limit = 20, status) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await articleModel.findAndCountAll({
                attributes: {
                    exclude: ['version', 'content']
                },
                include: [{
                    model: columnsModel,
                    attributes: [
                        'title'
                    ]
                },
                    {
                        model: websiteModel,
                        attributes: [
                            'website'
                        ]
                    },
                    {
                        model: authorModel,
                        attributes: [
                            'name'
                        ]
                    }
                ],
                offset: (page - 1) * limit,
                limit: limit,
                where: {
                    website_id: website_id,
                    state: status
                },
                transaction: t
            });

            return ins;
        })
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return 'error';
    }
}

/**
 * 根据栏目ID查询该栏目下的所有文章
 * @param {*} columns_id
 * @param {*} page
 * @param {*} limit
 */
const selectArticleByColumnsID = async (columns_id, page = 1, limit = 20, status) => {

    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await articleModel.findAndCountAll({
                attributes: {
                    exclude: ['version', 'content']
                },

                offset: (page - 1) * limit,
                limit: limit,
                where: {
                    columns_id: columns_id,
                    state: status
                },
                transaction: t
            });

            return ins;
        })
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return 'error';
    }
}

/**
 * 根据文章id获取文章详细内容
 * @param {*} article_id
 */
const selectArticleByArticleID = async (article_id) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await articleModel.findOne({
                attributes: {
                    exclude: ['version']
                },
                where: {
                    article_id: article_id
                },
                transaction: t
            });

            return ins;
        })
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return 'error';
    }
}

/**
 * @description 根据文章标题查询文章
 * @param title
 * @returns {Promise<unknown>}
 */
const selectArticleByTitle = async (title) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await articleModel.findOne({
                attributes: {
                    exclude: ['version']
                },
                where: {
                    title: {
                        [Op.like]: '%' + title + '%',
                    },
                    state: 'done'
                },
                transaction: t
            });

            return ins;
        })
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return 'error';
    }
}

module.exports = {
    createArticle,
    selectAllArticle,
    selectArticleByColumnsID,
    selectArticleByArticleID,
    selectArticleByTitle,
    deleteArticle,
    updateArticle
}