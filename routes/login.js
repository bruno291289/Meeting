module.exports = function(app) {
    app.get('/login', function(req, res) {
        res.render('login', {
            title: req.i18n.t('app.title'),
            form_title: req.i18n.t('app.login.title'),
            label_email: req.i18n.t('app.login.email'),
            label_password: req.i18n.t('app.login.password'),
            button_sigin: req.i18n.t('app.login.sigin'),
            button_register: req.i18n.t('app.login.register')
        });
    });

    app.get('/registeruser', function(req, res) {
        res.render('register', {
            title: req.i18n.t('app.title'),
            form_title: req.i18n.t('app.login.title'),
            label_name: req.i18n.t('app.login.name'),
            label_email: req.i18n.t('app.login.email'),
            label_password: req.i18n.t('app.login.password'),
            label_confirm_password: req.i18n.t('app.login.confirmpassword'),
            button_submit: req.i18n.t('app.buttons.submit')
        });
    });

}