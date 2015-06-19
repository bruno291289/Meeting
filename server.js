var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var load = require('express-load');
var passport = require('passport');
var i18next = require('i18next');
var methodoverride = require('method-override')();

i18next.init();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));
app.use(i18next.handle);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodoverride);
app.use(passport.initialize());

i18next.registerAppHelper(app);

mongoose.connect('mongodb://localhost/soccermetting');
var db = mongoose.connection;

load('models').then('config').then('controllers').then('routes').into(app);
app.listen(3000);
console.log("Server running on port 3000.");