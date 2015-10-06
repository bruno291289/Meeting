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
        savePhotos: function(req, res) {
            console.log('Salvando foto');
            Company.findOne({
                _id: req.body.company_id
            }, function(err, doc) {
                if (!err) {
                    for (var i = 0; i < req.files.length; i++) {
                        var f = req.files[i];
                        doc.pictures.push({
                            src: f.path.replace('public/', '')
                        });
                    }
                    console.log('SAVING ' + doc);
                    doc.save(function(err, doc) {
                        if (err) {
                            console.log('ERRO AO TENTAR SALVAR AS FOTOS ' + err);
                        }
                        res.json(doc);
                    });
                } else
                    console.log('ERRO AO TENTAR CONSULTAR A EMPRESA DO USUAŔIO ' + err);
            });
        },
        removePhoto: function(req, res) {
            console.log('Removendo Imagem');
            console.log('Id da empresa ' + req.params.id);
            console.log('Id da imagem ' + req.params.picid);

            Company.findOne({
                _id: req.params.id
            }, function(err, doc) {
                var p = doc.pictures.id(req.params.picid).remove();
                console.log('p ' + p);
                var fs = require('fs');
                fs.unlinkSync(__dirname.replace('/controllers', '') + '/public/' + p.src);
                doc.save(function(err, doc) {
                    if (err) {
                        console.log('erro ao tentar remover a imagem ' + err);
                    } else {
                        res.json(doc)
                    }
                });
            });
        }
    };
    return CompanyController;
}