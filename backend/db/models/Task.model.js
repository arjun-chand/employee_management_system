const {DataTypes} = require('sequelize');
const sequelize = require('../database.config');

const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
        name:{
            type: DataTypes.STRING
        } 
    },
    {
        tableName: 'Task', // Set the table name
        timestamps: true // Enable timestamps (created_at and updated_at columns)
    }
);

module.exports = Task;