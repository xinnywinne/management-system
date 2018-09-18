const express = require('express');
const router = express.Router();
const Timezone = require('../model/timezone');


router.get('', function (req, res) {
  Timezone.findAll().then((data) => {
    res.json(data);
  }, (error) => {
    res.json(error);
  });
});

module.exports = router;
