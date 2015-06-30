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
            var company = new Company(req.body);

            if(!company.owner)
                company.ower = req.user;

            company.save(function(err, p) {
                if (!err) {
                    console.log('company saved ' + p);
                    res.json(p);
                } else {
                    console.log('an error ocurred while trying to save the company ' + err);
                }
            });
        }

    };

    return CompanyController;
}