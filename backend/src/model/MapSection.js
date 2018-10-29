const Sequelize = require('sequelize');
const sequelize = require('./connection');


const MapSection = sequelize.define('MapSection', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  MapId: Sequelize.INTEGER,
  Color: Sequelize.STRING(80),
  Name: Sequelize.STRING(80),
  Path: Sequelize.STRING(500),
  Type: Sequelize.STRING(80),
  CreatedTimestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = MapSection;
