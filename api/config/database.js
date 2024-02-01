const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mini_project', 'postgres', 'rav', {
  host: 'db',
  dialect: 'postgres'
});


module.exports = sequelize