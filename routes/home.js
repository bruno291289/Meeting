module.exports = function(app) {

    var authenticator = require('../util/authenticator');

    app.get('/home', authenticator, function(req, res) {
        res.render('home', {
            useremail: req.user.email,
            logout: req.i18n.t('app.buttons.logout'),
            company: req.i18n.t('app.buttons.company'),
            title: req.i18n.t('app.title'),
        });
    });

}