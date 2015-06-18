module.exports = function(app) {
    var User = app.models.user;
    var passport = require('passport');

    app.get('/login', function(req, res){
        res.render('login', {
            title: req.i18n.t('app.title'),
            form_title: req.i18n.t('app.login.title'),
            label_email: req.i18n.t('app.login.email'),
            label_password: req.i18n.t('app.login.password'),
            button_sigin: req.i18n.t('app.login.sigin'),
            button_register: req.i18n.t('app.login.register')
        });
    });

}