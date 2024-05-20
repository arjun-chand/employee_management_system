const { DataTypes } = require('sequelize');
const sequelize = require('../database.config'); // Adjust path as necessary

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
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        city: {
            type: DataTypes.STRING(200)
        },
        state: {
            type: DataTypes.STRING(200)
        },
        country: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING(10),
            validate: {
                isIn: [['Male', 'Female', 'Other']]
            }
        },
        education: {
            type: DataTypes.STRING(200)
        },
        hobbies: {
            type: DataTypes.ARRAY(DataTypes.STRING(200))
        }
    },
    {
        tableName: 'Employee', // Set the table name
        timestamps: false // Disable timestamps if not needed
    }
);

module.exports = Employee;
