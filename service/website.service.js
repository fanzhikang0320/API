const sequelize = require("../models/db");

const WebsiteModel = require("../models/website");
const { sqlLogger } = require("../common/logger");

/**
 * 添加一个网站
 * @param {*} website
 * @returns
 */
const createWebsite = async (website) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await WebsiteModel.create(
                {
                    website: website,
                },
                { transaction: t }
            );

            return ins.toJSON();
        });

        return results;
    } catch (error) {
        sqlLogger.error(error);
        return "error";
    }
};

/**
 * 更新一个网站
 * @param {*} website_id
 * @param {*} param1
 * @returns
 */
const updateWebsite = async (website_id, params) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await WebsiteModel.update(
                {
                    ...params,
                },
                {
                    where: {
                        website_id: website_id,
                    },
                    transaction: t,
                }
            );
            return ins;
        });
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return "error";
    }
};

/**
 * 分页查询网站
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
const selectWebsite = async (page = 1, limit = 20) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await WebsiteModel.findAndCountAll({
                attributes: {
                    exclude: ["version"],
                },

                offset: (page - 1) * limit,
                limit: limit,
                transaction: t,
            });

            return ins;
        });
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return "error";
    }
};

/**
 * 查询所有网站
 * @returns
 */
const selectAllWebsite = async () => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await WebsiteModel.findAll({
                transaction: t,
            });

            return ins;
        });
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return "error";
    }
};

/**
 * 查询某个网站信息
 * @param {*} website_id
 */
const selectOneWebsite = async (website_id) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await WebsiteModel.findOne({
                where: {
                    website_id: website_id,
                },
                transaction: t,
            });

            return ins;
        });
        return results;
    } catch (error) {
        sqlLogger.error(error);
        return "error";
    }
};

module.exports = {
    createWebsite,
    updateWebsite,
    selectWebsite,
    selectAllWebsite,
    selectOneWebsite,
};
