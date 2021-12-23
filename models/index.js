const websiteModel = require('./website');
const articleModel = require('./article');
const usersModel = require('./users');
const columnsModel = require('./columns');
const Sequelize = require('./db');
const authorModel = require('./author');
websiteModel.hasMany(columnsModel, {foreignKey: 'website_id'});
columnsModel.belongsTo(websiteModel, {foreignKey: 'website_id'});

authorModel.hasMany(articleModel, {foreignKey: 'author_id'});
articleModel.belongsTo(authorModel, {foreignKey: 'author_id'});

websiteModel.hasMany(articleModel, {foreignKey: 'website_id', sourceKey: 'website_id'});
articleModel.belongsTo(websiteModel, {foreignKey: 'website_id', targetKey: 'website_id'});

columnsModel.hasMany(articleModel, {foreignKey: 'columns_id', sourceKey: 'columns_id'});
articleModel.belongsTo(columnsModel, {foreignKey: 'columns_id', targetKey: 'columns_id'});

// 同步所有数据表模型
Sequelize.sync({
    alter: true
}).then(() => {
    console.log('Synchronize all models');
})