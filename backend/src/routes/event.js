const express = require('express');
const event = express.Router();
const Event = require('../model/Event');
const Performer = require('../model/Performer');
const PerformerEvent = require('../model/PerformerEvent');

//Performer.belongsToMany(Event, {through: PerformerEvent});
//Event.belongsToMany(Performer, {through: PerformerEvent});
Event.hasMany(PerformerEvent, {foreignKey: 'EventId', as: 'Performers'});


event.get('', function (req, res) {
  Event.findAll({
    include: [{
      model: PerformerEvent,
      as: 'Performers',
      attributes: ['PerformerId']
    }],
  }).then((data) => {
    res.json({
      error: false,
      data: data,
      message: 'Event lists',
    });
  }, (error) => {
    res.json({
      error: error
    });
  });
});

event.get('/:eventId', (req, res) => {
  Event.findOne(
    {
      include: [Performer],
      where: {Id: 1}
    }
  ).then((data) => {
    res.json(data);
  });
});

event.put('/:eventId', (req, res) => {
  res.json(req.body);
});

module.exports = event;
