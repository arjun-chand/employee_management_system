const { DataTypes } = require('sequelize');
const sequelize = require('../database.config'); // Adjust path as necessary
const User = require('./User.model');

const Employee = sequelize.define(
    'Employee',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Male', 'Female', 'Other']]
            }
        },
        education: {
            type: DataTypes.STRING
        },
        hobbies: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Employee',
        timestamps: true
    }
);
Employee.belongsTo(User)
module.exports = Employee;
