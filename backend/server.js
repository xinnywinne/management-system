const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./src/config.js');
const DBPool = mysql.createPool(config.db);
const app = express();
const order = require('./src/routes/order');
const event = require('./src/routes/event');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const PORT = process.env.PORT || 8080;

app.use('', order);
app.use('', event);
app.listen(PORT, function () {
    console.log('Node app is running on port 8080');
});