const path = require('path');
const passport = require('passport');
const passportService = require('./server/services/passport');
const Controller = require('./server/controllers/index');

// no need for cookie based session for user, but since we are using jwt
// we dont wnat passport to use the cookie sesion default
const requireJwt = passport.authenticate('jwt', { session: false });
const requireLocal = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Authenication Controller
  app.post('/api/signin', requireLocal, Controller.Authentication.signin);
  app.post('/api/signup', Controller.Authentication.signup);

  // Home Controller
  app.get('/api/home/fetch_users', requireJwt, Controller.Home.fetchUsers);

  // Chat Controller
  app.get('/api/chat/fetch_messages', requireJwt, Controller.Chat.fetchMessages);
  app.get('/api/chat/unread_count', requireJwt, Controller.Chat.fetchUnreadCount);
  app.get('/api/chat/unread_messages', requireJwt, Controller.Chat.fetchUnreadMessages);
  app.post('/api/chat/update_messages_to_read', requireJwt, Controller.Chat.updateMessagesToRead);

  // User Controller
  app.get('/api/current_user', requireJwt, Controller.User.currentUser);
  app.get('/api/user/:id', requireJwt, Controller.User.fetchUserDetail);
  app.post('/api/user/toggle_like_user', requireJwt, Controller.User.toggleLikeUser);

  // Utility Controller
  app.get('/api/utility/seed_data', Controller.Utility.seedData);
  app.post('/api/utility/seed_data_dump', Controller.Utility.seedDataDump);

  // all
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
};
