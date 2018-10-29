const express = require('express');
const router = express.Router();
const Map = require('../model/Map');
const MapSection = require('../model/MapSection');


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

router.get('/:mapId/sections', (req, res) => {
  let mapId = req.params.mapId;
  MapSection.findAll({
    where: {
      MapId: mapId
    }
  }).then((data) => {
    res.json(data);
  }, (error) => {
    res.json(error);
  });
});

router.get('/:mapId/sections/:sectionId', (req, res) => {
  let mapId = req.params.mapId;
  let sectionId = req.params.sectionId;
  MapSection.findOne({
    where: {
      Id: sectionId,
      MapId: mapId
    }
  }).then((data) => {
    res.json(data);
  }, (error) => {
    res.json(error);
  });
});

router.post('/:mapId/sections', (req, res) => {
  let mapId = req.params.mapId;
  let path = req.body.path;
  let type = req.body.type;
  const data = {
    MapId: mapId
  };
  if (path) {
    data['Path'] = path;
  }
  if (type) {
    data['Type'] = type;
  }
  MapSection.create(data).then((data) => {
    console.log(data);
    res.json({});
  });
});

module.exports = router;
