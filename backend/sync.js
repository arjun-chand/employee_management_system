const sequelize = require('./db/database.config');
const Employee = require('./db/models/Employee.model');
const User = require('./db/models/User.model');
const Task = require('./db/models/Task.model')

(async () => {
    try {
        await sequelize.sync({ alter:true });
        console.log('Tables synchronized successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
})();
