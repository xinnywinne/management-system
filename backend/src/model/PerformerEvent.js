const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Performer = require('../model/Performer');
const Event = require('../model/Event');


const PerformerEvent = sequelize.define('PerformerEvent', {
  PerformerId: {
    type: Sequelize.STRING(80),
    primaryKey: true,
    references: {
      model: Performer,
      key: 'Id'
    }
  },
  EventId: {
    type: Sequelize.STRING(80),
    primaryKey: true,
    references: {
      model: Event,
      key: 'Id'
    }
  },
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = PerformerEvent;
