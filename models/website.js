const { DataTypes, Sequelize } = require('sequelize');
const table = require('./db');


const Websites = table.define('public_api_websites', {

    website_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        unique: 'column',
        primaryKey: true
    },
    website: {
        type: DataTypes.STRING(128),
        comment: 'web links'
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

module.exports = Websites;