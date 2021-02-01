const userController = require('../controllers/user-controller');
const passport = require('passport');

module.exports = app => {
  app
    .route('/user/login')
    .post(
      passport.authenticate('local', { session: false }),
      userController.login
    );

  app
    .route('/user')
    .post(usuariosControlador.addUser)
    .get(usuariosControlador.list);

  app.route('/user/:id')
    .delete(usuariosControlador.delete);
};
