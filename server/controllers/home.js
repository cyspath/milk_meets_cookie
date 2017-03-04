const User = require('../models').User;

exports.fetchUsers = (req, res, next) => {
  const currentUser = req.user;

  currentUser.getLikedUsers()
  .then(function (users) {
    const likedIds = new Set(users.map((u) => u.id));
    User.findAll({ where: {
      province: currentUser.province,
      city: currentUser.city,
      looking_for: currentUser.sex,
      sex: currentUser.looking_for,
    }})
    .then((users) => {
      users.forEach((u) => u.updatedLiked(likedIds));
      res.send({ users });
    })
    .catch((err) => {
      console.log("500 Error: ", err.name);
      res.status(500).send({ error: err.name });
    });

  });
}
