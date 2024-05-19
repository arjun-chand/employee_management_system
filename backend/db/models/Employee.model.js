const { DataTypes } = require('sequelize');
const sequelize = require('../database.config');

const Employee = sequelize.define(
    'Employee',
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
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    },
    {
        tableName: 'employees', // Set the table name
        timestamps: false // Disable timestamps if not needed
    }
);

module.exports = Employee;
