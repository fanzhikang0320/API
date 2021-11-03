const { Sequelize } = require('sequelize');
const user = process.env.DATABASE_USER;
const pwd = process.env.DATABASE_PWD;
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const dialect = process.env.DATABASE_DIALECT;
const name = process.env.DATABASE_NAME;
const { sqlLogger } = require('../common/logger');
module.exports = new Sequelize(name,user,pwd,{
    host: host,
    port: port,
    dialect: dialect,
    logging: (msg) => {
        sqlLogger.info(msg)
    }
})