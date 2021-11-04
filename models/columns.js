const { DataTypes, Sequelize } = require('sequelize');
const table = require('./db');

const Columns = table.define('public_api_columns', {
    columns_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: 'column',
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(128),
        comment: 'column title',
        defaultValue: '默认栏目'
    }

}, {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'ctime',
    updatedAt: 'utime',
    deletedAt: 'dtime',
    version: true
})

module.exports = Columns;