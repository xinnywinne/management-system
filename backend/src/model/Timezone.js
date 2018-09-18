const Sequelize = require('sequelize');
const sequelize = require('./connection');


const Timezone = sequelize.define('TimeZone', {
  Id: {type: Sequelize.STRING(20), primaryKey: true},
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Timezone;
