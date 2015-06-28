module.exports = function(app) {
    var controller = app.controllers.user;

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
            button_submit: req.i18n.t('app.buttons.submit'),
            error_name_required: req.i18n.t('app.registeruser.nameRequired'),
            error_email_required: req.i18n.t('app.registeruser.emailRequired'),
            error_email_format: req.i18n.t('app.registeruser.emailRightFormat'),
            error_password_required: req.i18n.t('app.registeruser.passwordRequired'),
            error_confirm_password_required: req.i18n.t('app.registeruser.passwordConfirmationRequired'),
            error_confirm_password_doesnt_match: req.i18n.t('app.registeruser.passwordConfirmationDoesntMatch'),
        });
    });

    app.post('/registeruser', controller.save);

}