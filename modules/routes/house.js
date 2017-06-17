var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 27017 is default mongo port
mongoose.connect('localhost:27017/realestate');

var newlist = new mongoose.Schema({
  cost: Number,
	rent : Number,
	sqft : Number,
	city : String
});
var housesModel = mongoose.model('listings', newlist);

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());



router.get('/', function(req, res) {
  // get and send back all the things
  console.log('get houses db');
  housesModel.find().then(function(data) {

    res.send(data);

  });
});

module.exports = router;
