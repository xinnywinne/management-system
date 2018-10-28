const express = require('express');
const router = express.Router();
const Map = require('../model/Map');


router.get('', function (req, res) {
  Map.findAll().then((data) => {
    res.json(data);
  }, (error) => {
    res.json(error);
  });
});

router.get('/:mapId', (req, res) => {
  Map.findOne({
    where: {Id: 1}
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
