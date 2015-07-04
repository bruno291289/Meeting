module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: req.i18n.t('app.title'),
            button_sigin: req.i18n.t('app.login.sigin'),
            button_register: req.i18n.t('app.login.register')
        });
    });
}