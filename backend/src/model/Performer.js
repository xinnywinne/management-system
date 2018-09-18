const Sequelize = require('sequelize');
const sequelize = require('./connection');


const Performer = sequelize.define('Performer', {
  Id: {type: Sequelize.STRING(80), primaryKey: true},
  Name: Sequelize.STRING(80),
  Image: Sequelize.STRING(300),
  ExternalLink: Sequelize.STRING(80),
  Description: Sequelize.STRING(80),
  CreatedTimestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Performer;
