const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./src/config.js');
const DBPool = mysql.createPool(config.db);
const app = express();
const order = require('./src/routes/order');
const event = require('./src/routes/event');
const performer = require('./src/routes/performer');
const map = require('./src/routes/map');
const timezone = require('./src/routes/timezone');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const PORT = process.env.PORT || 8080;

const PREFIX = '/api/v1';

app.use(`${PREFIX}/orders`, order);
app.use(`${PREFIX}/events`, event);
app.use(`${PREFIX}/performers`, performer);
app.use(`${PREFIX}/maps`, map);
app.use(`${PREFIX}/timezones`, timezone);

app.listen(PORT, function () {
    console.log('Node app is running on port 8080');
});
