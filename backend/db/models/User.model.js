const { DataTypes } = require('sequelize');
const sequelize = require('../database.config');

const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'User',
        timestamps: true
    }
);

module.exports = User;
