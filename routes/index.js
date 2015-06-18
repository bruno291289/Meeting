module.exports = function(app) {
    var User = app.models.user;
    var passport = require('passport');

    app.get('/', function(req, res) {
        res.render('index', {title: req.i18n.t('app.title')});
    });

    app.post('/registeruser', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }

        var user = User();
        user.email = req.body.email;
        user.setPassword(req.body.password)

        user.save(function(err) {
            if (err) {
                return next(err);
            }

            return res.json({
                token: user.generateJWT()
            })
        });
    });

    app.post('/login', function(req, res, next) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }

        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }

            if (user) {
                return res.json({
                    token: user.generateJWT()
                });
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });

}