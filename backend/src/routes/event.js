const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('../config.js');
const DBPool = mysql.createPool(config.db);
const event = express.Router(); 

event.get('/api/v1/events', function (req, res) {
  DBPool.query('SELECT * FROM Event', function (error, results, fields) {
    if (error) throw error;
    return res.send({error: false, data: results, message: 'Event lists'});
  });
});

module.exports = event;