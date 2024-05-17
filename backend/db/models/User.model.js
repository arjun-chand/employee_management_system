const { DataTypes } = require('sequelize');
const sequelize = require('../database.config'); // Import the Sequelize instance

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

// Export the User model
module.exports = User;
