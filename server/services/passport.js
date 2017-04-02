const passport = require('passport');
const User = require('../models').User;
const config =  require('../config');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const secret = config[process.env.NODE_ENV].jwtSecret

// Email and password login strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  console.log('# LocalStrategy: email received', email);
  User
  .findOne({ where: { email } })
  .then((user) => {
    if (!user) {
      console.log('# LocalStrategy error: user doesnt exist');
      return done(null, false);
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.log('# LocalStrategy error: ', err);
        return done(err);
      }
      if (!isMatch) {
        console.log('# LocalStrategy error: password does not match');
        return done(null, false);
      }
      console.log('# LocalStrategy success: user authenicated');
      return done(null, user);
    });
  })
  .catch((err) => {
    console.log('# LocalStrategy error: ', err);
    return done(err);
  });
});

// JWT login strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('# JwtStrategy: payload received', payload);
  User
  .findById(payload.sub)
  .then((user) => {
    if (user) {
      console.log('# JwtStrategy success: user found');
      done(null, user)
    } else {
      console.log('# JwtStrategy error: user doesnt exist');
      done(null, false);
    }
  })
  .catch((err) => {
    console.log('# JwtStrategy error: ', err);
    return done(err, false);
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
