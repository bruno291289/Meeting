module.exports = function(app) {

    var authenticator = require('../util/authenticator');

    app.get('/company', authenticator, function(req, res) {
        res.render('company', {
            logout: req.i18n.t('app.buttons.logout'),
            title: req.i18n.t('app.title'),
            form_title: req.i18n.t('app.company.title'),
            label_name: req.i18n.t('app.company.name'),
            label_email: req.i18n.t('app.company.email'),
            error_name_required: req.i18n.t('app.company.nameRequired'),
            error_email_required: req.i18n.t('app.company.emailRequired'),
            error_email_format: req.i18n.t('app.company.emailRightFormat'),
            address: req.i18n.t('app.company.address.title'),
            label_street: req.i18n.t('app.company.address.street'),
            label_street: req.i18n.t('app.company.address.street'),
            error_street_required: req.i18n.t('app.company.address.streetRequired'),
            label_zipcode: req.i18n.t('app.company.address.zipcode'),
            error_zipcode_required: req.i18n.t('app.company.address.zipcodeRequired'),
            label_number: req.i18n.t('app.company.address.number'),
            error_number_required: req.i18n.t('app.company.address.numberRequired'),
            label_neighborhood: req.i18n.t('app.company.address.neighborhood'),
            error_neighborhood_required: req.i18n.t('app.company.address.neighborhoodRequired'),
            label_city: req.i18n.t('app.company.address.city'),
            error_city_required: req.i18n.t('app.company.address.cityRequired'),
            label_country: req.i18n.t('app.company.address.country'),
            error_country_required: req.i18n.t('app.company.address.countryRequired'),
        });
    });

}