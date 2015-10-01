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
var multer = require('multer');
var upload = multer({
    dest: './uploads/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
});

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

/*app.use(multer({
    dest: './uploads/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));*/

app.post('/company/photo', upload.array('userPhoto'), function(req, res) {
    console.log(req.files);
    console.log(req.body);
    res.json();
});


i18next.registerAppHelper(app);

mongoose.connect('mongodb://localhost/soccermetting');
var db = mongoose.connection;

load('models').then('controllers').then('routes').into(app, passport);
require('./config/passport')(app, passport);

app.listen(3000);
console.log("Server running on port 3000.");