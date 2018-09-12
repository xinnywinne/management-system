const express = require('express');
const mysql = require('mysql');
const config = require('../config.js');
const DBPool = mysql.createPool(config.db);
const order = express.Router();

order.put('/api/v1/orders/:orderId', function (req, res) {
  let order_id = req.params.orderId;
  let status = req.body.Status;
  DBPool.query('UPDATE `Order` SET Status = ? WHERE Id = ?', 
               [status, order_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({error: false, data: results, 
                     message: 'Order status has been updated '});
               });
});

order.get('/api/v1/orders', function (req, res) {
  DBPool.query('SELECT * FROM `Order`', function (error, results, fields) {
    if (error) throw error;
    return res.send({error: false, data: results, message: 'Order lists'});
  });
  DBPool.query('SELECT It')

});

module.exports = order;