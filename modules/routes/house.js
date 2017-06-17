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

router.post('/', function(req, res) {
  console.log('db post: ', recordToAdd);
  // retrieved the req.body
  // putting it into an object to be saved in the db
  var recordToAdd = {
    cost: req.body.cost,
  	rent : req.body.rent,
  	sqft : req.body.sqft,
  	city : req.body.city
  };
if(req.body.rent === undefined){

  recordToAdd = {
    cost: req.body.cost,
  	sqft : req.body.sqft,
  	city : req.body.city
  };
  } else if(req.body.cost === undefined){
    recordToAdd = {
    	rent : req.body.rent,
    	sqft : req.body.sqft,
    	city : req.body.city
    };
  }
  // create new record
  var newRecord = housesModel(recordToAdd);

  newRecord.save();

});

module.exports = router;
