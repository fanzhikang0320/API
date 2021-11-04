const sequelize = require('../models/db');

const ColumnsModel = require('../models/columns');


const { sqlLogger } = require('../common/logger');

/**
 * 创建一个栏目
 * @param {*} website_id 
 * @param {*} title 
 * @returns 
 */
const createColumns = async (website_id, title) => {
    try {
        const results = await sequelize.transaction(async (t) => {

            const ins = await ColumnsModel.create({
                website_id: website_id,
                title: title

            }, { transaction: t });

            return ins.toJSON();
        })
        return results;
    } catch (error) {

        sqlLogger.error(error);
        return 'error';
    }
}

/**
 * 更新 Columns
 * @param {*} columns_id 
 * @param {*} params 
 * @returns 
 */
const updateColumns = async (columns_id, params) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await ColumnsModel.update({
                ...params
            }, {
                where: {
                    columns_id: columns_id
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
 * 查询某个网站下所有栏目
 * @returns 
 */
const selectAllColumns = async (website_id) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await ColumnsModel.findAll({
                where: {
                    website_id: website_id
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
 * 查询某个columns 信息
 * @param {*} columns_id 
 */
const selectOneColumns = async (columns_id) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await ColumnsModel.findOne({
                where: {
                    columns_id: columns_id
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
    createColumns,
    updateColumns,
    selectAllColumns,
    selectOneColumns
}