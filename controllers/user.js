module.exports = function(app) {
    var UserController = {
        listAll: function(req, res) {
            app.db.users.find(function(err, docs) {
                res.json(docs);
            });
        },
        insert: function(req, res) {
            var user = new app.models.user(req.body);
            user.path('email').validate(function(email) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email.text);
            }, 'The e-mail field cannot be empty.');

            user.save(function(err, p) {
                if (!err) {
                    res.json(p);
                }
            });
        },
        delete: function(req, res) {
            db.users.remove({
                _id: mongojs.ObjectId(req.params.id)
            }, function(err, doc) {
                res.json(doc);
            });
        },
        view: function(req, res) {
            db.users.findOne({
                _id: mongojs.ObjectId(req.params.id)
            }, function(err, doc) {
                res.json(doc);
            });
        },
    };
    return UserController;
}