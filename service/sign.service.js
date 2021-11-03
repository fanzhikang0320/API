const sequelize = require('../models/db');
const Users = require('../models/users');
const { sqlLogger } = require('../common/logger');

/**
 * 根据账号去查询当前用户信息
 * @param {*} account 
 * @returns 
 */
const selectUserByAccount = async (account) => {
    try {
        const results = await sequelize.transaction(async (t) => {
            const ins = await Users.findOne({
                where: {
                    account: account
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
 * 创建一个新用户
 * @param {*} account 
 * @param {*} pwd 
 * @param {*} nickname 
 * @param {*} avatar 
 * @returns 
 */
const createUser = async (account,pwd,nickname,avatar) => {

    try {
        const result = await sequelize.transaction(async (t) => {

            const ins = await Users.create({
                account: account,
                password: pwd,
                nickname: nickname,
                avatar: avatar

            },{ transaction: t });

            return ins.toJSON();
        })
        return result;
    } catch (error) {
        
        sqlLogger.error(error);
        return 'error';
    }
}

/**
 * 更新某个账号信息
 * @param {*} account 
 * @param {*} param1 
 * @returns 
 */
const updateUser = async (account, { ...params }) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const ins = await Users.update({
                ...params    
            },{
                where: {
                    account: account
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

/**
 * 删除一个用户
 * @param {*} account 
 * @returns 
 */
const deleteUser = async (account) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const ins = await Users.destroy({
                where: {
                    account: account
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

module.exports = {
    createUser,
    selectUserByAccount,
    updateUser,
    deleteUser
}
