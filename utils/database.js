const Sequelize = require('sequelize');

const sequelize = new Sequelize('hunger_genie', 'root', 'bhanu@bhanu', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;