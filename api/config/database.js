const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mini_project', 'postgres', 'rav', {
  host: 'localhost',
  dialect: 'postgres'
});


module.exports = sequelize