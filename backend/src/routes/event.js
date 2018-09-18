const express = require('express');
const event = express.Router();
const Event = require('../model/Event');
const Performer = require('../model/Performer');
const PerformerEvent = require('../model/PerformerEvent');

Performer.belongsToMany(Event, {through: PerformerEvent});
Event.belongsToMany(Performer, {through: PerformerEvent});

event.get('', function (req, res) {
  Event.findAll({
    include: [Performer],
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

module.exports = event;
