const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const table = require('./db');
const websiteModel = require('./website');
const columnsModel = require('./columns');
const Articles = table.define('public_api_articles', {
    article_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: 'column'
    },

    title: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING(128),
    },
    keywords: {
        type: DataTypes.STRING(128),
    },
    introduce: {
        type: DataTypes.TEXT,
    },
    content: {
        type: DataTypes.TEXT
    },
    main_picture: {
        type: DataTypes.STRING(128)
    },
    date: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.STRING(128),
        defaultValue: 'done', // deleted or  pending or done
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

module.exports = Articles;