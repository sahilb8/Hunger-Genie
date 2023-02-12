const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Dish = sequelize.define('dish',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


module.exports = Dish;