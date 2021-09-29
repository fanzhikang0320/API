const { DataTypes, Sequelize } = require('sequelize');
const table = require('./db');


const Author = table.define('public_api_author',{
    author_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: 'column',
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    introduce: {
        type: DataTypes.STRING(128)
    },
    avatar: {
        type: DataTypes.STRING(128)
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

module.exports = Author;