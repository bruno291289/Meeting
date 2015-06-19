module.exports = function(app) {
    var User = app.models.user;

    var UserController = {

        listAll: function(req, res) {
            User.find(function(err, docs) {
                res.json(docs);
            });
        },

        save: function(req, res) {
            var user = new User(req.body);
            user.save(function(err, p) {
                if (!err) {
                    res.json(p);
                }
            });
        },

        delete: function(req, res) {
            User.remove({
                _id: req.params.id
            }, function(err, doc) {
                res.json(doc);
            });
        },

        view: function(req, res) {
            User.findOne({
                _id: req.params.id
            }, function(err, doc) {
                res.json(doc);
            });
        },

        update: function(req, res){
            db.users.findOneAndUpdate({_id: req.body._id}, req.body, function(err, doc){
                req.json(doc);
            });
        }

    };

    return UserController;
}