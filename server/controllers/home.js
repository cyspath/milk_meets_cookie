const _ = require('underscore');
const User = require('../models').User;
const SearchPreference = require('../models').SearchPreference;

exports.fetchUsers = (req, res, next) => {
  const currentUser = req.user;
  if (_.isEmpty(req.query)) {
    queryUsersExistingPreference(req, res, currentUser);
  } else {
    queryUserNewPreference(req, res, currentUser);
  }

}

const queryUserNewPreference = (req, res, user) => {
  const query = Object.assign(req.query, { omitNull: true });
  user
    .getSearchPreference()
    .then((sp) => {
      sp.updateAttributes(query)
        .then((sp) => {
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
    })

}

const queryUsersExistingPreference = (req, res, user) => {
  user
    .getSearchPreference()
    .then((sp) => {
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
