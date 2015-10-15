module.exports = function(app) {
    var Space = app.models.space;
    var SpaceController = {
        list: function(req, res) {
            var companyid = req.param.companyid;
            Space.find({
                company: {
                    _id: companyid
                }
            }, function(err, docs) {
                //TODO TRATAR ERRO
                if (!err) {
                    res.json(docs);
                }
            });
        },
        save: function(req, res) {
            console.log('Salvando ' + req.body);
            var s = new Space(req.body);
            s.save(function(err, s) {
                //TODO - TRATAR ERRO
                if (!err) {
                    res.json(s);
                } else{
                    console.log('Erro ao tentar salvar o espaço ' + err);
                }
            });
        },
        delete: function(req, res) {
            var s = new Space(req.body);
            s.delete(function(err, s) {
                //TODO - TRATAR ERRO
                if (!err) {
                    res.json(s);
                }
            });
        },
    };
    return SpaceController;
}