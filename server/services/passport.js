const passport = require('passport');
const User = require('../models').User;
const config =  require('../config');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

// Email and password login strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User
  .findOne({ where: { email } })
  .then((user) => {
    if (!user) return done(null, false);
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  })
  .catch((err) => {
    return done(err);
  });
});

// JWT login strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log(User);
  User
  .findById(payload.sub)
  .then((user) => {
    return user ? done(null, user) : done(null, false);
  })
  .catch((err) => {
    return done(err, false);
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
