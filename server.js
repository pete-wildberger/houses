//requires
var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./modules/routes/index');
var houses = require('./modules/routes/house');


//uses
app.use(express.static ('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/houses', houses);
//globals
var port = process.env.PORT || 2017;

//listener
app.listen(port, function(){
  console.log('server up on 2017');
});
