module.exports = function(app) {
    var authenticator = require('../util/authenticator');
    var controller = app.controllers.company;

    var multer = require('multer');
    var upload = multer({
        dest: './public/uploads/'
    });

    app.get('/userCompany', authenticator, controller.userCompany);
    app.get('/company', authenticator, function(req, res) {
        res.render('company');
    });

    app.post('/company', authenticator, controller.save);

    app.get('/companypictures', authenticator, function(req, res) {
        res.render('companypictures')
    });

    app.post('/company/photo', upload.array('file'), controller.savePhotos);
    app.post('/company/photo/remove/:id/:picid', controller.removePhoto);
}