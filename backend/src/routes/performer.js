const express = require('express');
const router = express.Router();
const Performer = require('../model/Performer');


router.get('', function (req, res) {
  Performer.findAll().then((data) => {
    res.json(data);
  }, (error) => {
    res.json(error);
  });
});

module.exports = router;
