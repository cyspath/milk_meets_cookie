const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models').User;

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  const dob = req.body.dob;
  const email = req.body.email;
  const password = req.body.password;
  const sex = req.body.sex;
  const lookingFor = req.body.lookingFor;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User
  .findOne({ where: { email } })
  .then((existingUser) => {
    if (existingUser) // if does exist, create Error
      res.status(422).send({ error: 'Email is in use' });
    else // if does not exist, create and save record
      User.create({
        dob: dob,
        email: email,
        password: password,
        sex: sex,
        looking_for: lookingFor
      }).then((user) => {
        res.json({ success: true, token: tokenForUser(user) });
      }).catch((err) => {
        console.log("500 Error: ", err.name);
        res.status(500).send({ error: err.name });
      });
  })
  .catch((err) => {
    next(err);
  });

};
