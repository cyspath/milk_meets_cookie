const jwt = require('jwt-simple');
const config = require('../config');
const env = process.env.NODE_ENV || 'development';
const User = require('../models').User;
const secret = config[env].jwtSecret

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
};

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  const params = req.body;
  User
  .findOne({ where: { email: params.email } })
  .then((existingUser) => {
    if (existingUser) // if does exist, create Error
      res.status(422).send({ error: 'Email is in use' });
    else // if does not exist, create and save record
      User.create({
        username: params.username,
        dob: params.dob,
        email: params.email,
        password: params.password,
        gender: params.gender,
        looking_for: params.lookingFor,
        province: params.province,
        city: params.city,
      }).then((user) => {
        res.send({ token: tokenForUser(user) });
      }).catch((err) => {
        console.log("500 Error: ", err.name);
        res.status(500).send({ error: err.name });
      });
  })
  .catch((err) => {
    next(err);
  });
};
