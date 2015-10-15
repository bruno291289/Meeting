module.exports = function(app) {
    var authenticator = require('../util/authenticator');
    var controller = app.controllers.space;
    app.get('/space', authenticator, function(req, res) {
        res.render('space');
    });
    app.get('/space/:companyid', authenticator, controller.list);
    app.post('/space', authenticator, controller.save);
}