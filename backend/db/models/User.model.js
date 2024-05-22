const { DataTypes } = require('sequelize');
const sequelize = require('../database.config'); // Import the Sequelize instance
const Employee = require('./Employee.model');
// Define the User model
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
        }
    },
    {
        tableName: 'User', // Set the table name
        timestamps: true // Enable timestamps (created_at and updated_at columns)
    }
);

User.hasMany(Employee, { as: 'Employee' });
// Export the User model
module.exports = User;
