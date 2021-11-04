const sequelize = require('../models/db');

const { sqlLogger } = require('../common/logger');

const authorModel = require('../models/author');

/**
 * 创建一位作者
 * @param {*} param0 
 * @returns 
 */
const createAuthor = async ({ name, introduce, avatar }) => {
    try {
        const results = await sequelize.transaction(async (t) => {

            const ins = await authorModel.create({
                name,
                introduce,
                avatar
            }, { transaction: t });

            return ins.toJSON();
        })

        return results;

    } catch (error) {
        sqlLogger.error(error);
        return 'error'
    }
}

const updateAuthor = async (author_id, params) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await authorModel.update({
                ...params
            }, {
                where: {
                    author_id: author_id
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

const deleteAuthor = async (author_id) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const ins = await authorModel.destroy({
                where: {
                    author_id: author_id
                },
                transaction: t
            });
            return ins;
        })

        return result;
    } catch (error) {
        sqlLogger.error(error);
        return 'error'
    }
}

const selectAuthorInfo = async (author_id) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await authorModel.findOne({
                where: {
                    author_id: author_id
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

const selectAllAuthorForPaging = async (page = 1, limit = 20) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await authorModel.findAndCountAll({
                attributes: {
                    exclude: ['version']
                },

                offset: (page - 1) * limit,
                limit: limit,
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

const selectAllAuthor = async () => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await authorModel.findAll({

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
    createAuthor,
    updateAuthor,
    deleteAuthor,
    selectAuthorInfo,
    selectAllAuthorForPaging,
    selectAllAuthor
}