const path = require('path');
const passport = require('passport');
const passportService = require('./services/passport');
const Controller = require('./controllers/index');

// no need for cookie based session for user, but since we are using jwt
// we dont wnat passport to use the cookie sesion default
const requireJwt = passport.authenticate('jwt', { session: false });
const requireLocal = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Authenication Controller
  app.get('/api/current_user', requireJwt, Controller.Authentication.currentUser);
  app.post('/api/signin', requireLocal, Controller.Authentication.signin);
  app.post('/api/signup', Controller.Authentication.signup);

  // Home Controller
  app.get('/api/home/fetch_users', requireJwt, Controller.Home.fetchUsers);

  // Utility Controller
  app.get('/api/utility/seed_data', Controller.Utility.seedData);
  app.post('/api/utility/seed_data_dump', Controller.Utility.seedDataDump);



  // app.get('/api/message', requireAuth, (req, res) => {
  //   res.send({ 'message': "super secret message here! "});
  // });

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
};
