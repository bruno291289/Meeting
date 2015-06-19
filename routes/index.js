module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {title: req.i18n.t('app.title')});
    });
}