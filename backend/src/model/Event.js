const Sequelize = require('sequelize');
const sequelize = require('./connection');


const Event = sequelize.define('Event', {
  Id: {type: Sequelize.STRING(80), primaryKey: true},
  Name: Sequelize.STRING(80),
  Location: Sequelize.STRING(300),
  Img: Sequelize.STRING(80),
  Description: Sequelize.STRING(500),
  UtcDateTime: Sequelize.DATE,
  TimeZone: Sequelize.STRING(20),
  MapId: Sequelize.INTEGER,
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Event;
