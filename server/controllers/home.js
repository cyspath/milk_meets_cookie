const _ = require('underscore');
const User = require('../models').User;

exports.fetchUsers = (req, res, next) => {
  const currentUser = req.user;
  if (_.isEmpty(req.query)) {
    queryUsersExistinnPreference(req, res, currentUser);
  } else {
    // create SP then search
  }

}

const queryUsersExistinnPreference = (req, res, user) => {
  user
    .getSearchPreference()
    .then((sp) => {
      console.log(sp);
      const queryParam = sp.toQueryParam();
      console.log(queryParam);
      User
        .findAll(queryParam)
        .then((users) => {
          res.send({ users });
        })
        .catch((err) => {
          console.log("500 Error: ", err.name);
          res.status(500).send({ error: err.name });
        });
    })
    .catch((err) => {
      console.log("500 Error: ", err.name);
      res.status(500).send({ error: err.name });
    });
}
