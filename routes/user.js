module.exports = function(app) {

    var userController = app.controllers.user;

    app.get('/users', userController.listAll);

    app.post('/users', userController.insert);

    app.delete('/users/:id', userController.delete);

    app.get('/users/:id', userController.view);

}