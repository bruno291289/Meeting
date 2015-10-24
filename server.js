var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var load = require('express-load');
var passport = require('passport');
var i18next = require('i18next');
var methodoverride = require('method-override')();
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

i18next.init();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(i18next.handle);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodoverride);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
i18next.registerAppHelper(app);

//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://localhost/soccermetting';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'soccermetting';
}

mongoose.connect(mongodb_connection_string);
var db = mongoose.connection;

load('models').then('controllers').then('routes').into(app, passport);
require('./config/passport')(app, passport);

app.listen(server_port, server_ip_address, function(){
	console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});