const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models').User;

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
};

exports.getUser = (req, res, next) => {
  console.log('Authentication.getUser');
  res.send({
    currentUser: req.user
  });
}

exports.signin = (req, res, next) => {
  console.log('Authentication.signin');

  res.send({
    currentUser: req.user,
    token: tokenForUser(req.user)
  });
}

exports.signup = (req, res, next) => {
  const params = req.body;
  // if (Object.values(params).includes(null || undefined)) {
  //   return res.status(422).send({ error: 'Missing information'});
  // }
  User
  .findOne({ where: { email: params.email } })
  .then((existingUser) => {
    if (existingUser) // if does exist, create Error
      res.status(422).send({ error: 'Email is in use' });
    else // if does not exist, create and save record
      User.create({
        dob: params.dob,
        email: params.email,
        password: params.password,
        sex: params.sex,
        looking_for: params.lookingFor,
        province: params.province,
        city: params.city,
      }).then((user) => {
        res.send({
          currentUser: user,
          token: tokenForUser(user)
        });
      }).catch((err) => {
        console.log("500 Error: ", err.name);
        res.status(500).send({ error: err.name });
      });
  })
  .catch((err) => {
    next(err);
  });
};
