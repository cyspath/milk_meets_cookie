const path = require('path');
const Authentication = require('./server/controllers/authentication');
const passportService = require('./server/services/passport');
const passport = require('passport');

// no need for cookie based session for user, but since we are using jwt
// we dont wnat passport to use the cookie sesion default
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/api/message', requireAuth, (req, res) => {
    res.send({ 'message': "super secret message here! "});
  });
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
};
