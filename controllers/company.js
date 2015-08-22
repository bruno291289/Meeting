module.exports = function(app) {
    var Company = app.models.company;
    var CompanyController = {
        view: function(req, res) {
            Company.find({
                owner: req.user._id
            }, function(err, doc) {
                res.json(doc)
            });
        },
        save: function(req, res) {
            console.log('saving a new company ' + req.body);

            if (!req.body._id) {
                var company = new Company(req.body);

                if (!company.owner)
                    company.owner = req.user;

                company.save(function(err, p) {
                    if (!err) {
                        console.log('company saved ' + p);
                        res.json(p);
                    } else {
                        console.log('an error ocurred while trying to save the company ' + err);
                    }
                });
            } else {
                var id = req.body._id;
                delete req.body._id;
                Company.update({
                    _id: id
                }, req.body, function(err, numAffected) {
                    if (!err) {
                        console.log('affected companies ' + numAffected);
                        res.json(numAffected);
                    } else {
                        console.log('an error ocurred while trying to save the company ' + err);
                    }
                });
            }

        },
        userCompany: function(req, res) {
            Company.findOne({
                owner: req.user
            }, function(err, doc) {
                if (!err)
                    res.json(doc);
                else
                    console.log('ERRO AO TENTAR CONSULTAR A EMPRESA DO USUAŔIO ' + err);
            });
        },
    };
    return CompanyController;
}