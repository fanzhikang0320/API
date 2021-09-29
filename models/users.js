const { DataTypes, Sequelize } = require('sequelize');
const table = require('./db');


const Users = table.define('public_api_users', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: 'column',
        allowNull: false,
        primaryKey: true
    },
    account: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: 'column',
        comment: 'user account'
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING(128),
        comment: 'user nickname'
    },
    avatar: {
        type: DataTypes.STRING(128),
        defaultValue: '/public/upload/default_avatar.jpg'
    }

},{
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'ctime',
    updatedAt: 'utime',
    deletedAt: 'dtime',
    version: true
})

module.exports = Users;