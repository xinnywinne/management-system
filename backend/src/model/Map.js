const Sequelize = require('sequelize');
const sequelize = require('./connection');


const Map = sequelize.define('Map', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Name: Sequelize.STRING(80),
  Address: Sequelize.STRING(256),
  Img: Sequelize.STRING(80)
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Map;
