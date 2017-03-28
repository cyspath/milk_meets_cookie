const User = require('../models').User;
const Like = require('../models').Like;

exports.currentUser = (req, res, next) => {
  const user = req.user;
  user.getLikedUsers().then((likedUsers) => {
    user.getInterestedUsers().then((interestedUsers) => {
      res.send({ currentUser: user, likedUserIds: likedUsers.map((u) => u.id), interestedUsers });
    }).catch((err) => { res.send({ currentUser: user, likedUserIds: [], interestedUsers: [] }); });
  }).catch((err) => { res.send({ currentUser: user, likedUserIds: [], interestedUsers: [] }); });
}

exports.fetchUserDetail = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id }})
  .then((user) => {
    user
      .getSearchPreference()
      .then((sp) => {
        res.send({ user, searchPreference: sp });
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

exports.toggleLikeUser = (req, res, next) => {
  const params = { interested_user_id: req.user.id, liked_user_id: req.body.liked_user_id };
  Like.unscoped().find({ where: params })
  .then((like) => {
    if (like) {
      like.update(req.body).then((like) => {
        return res.send({ like });
      })
    } else {
      Like.create(params).then((like) => {
        return res.send({ like });
      })
    }
  })
  .catch((err) => {
    console.log("500 Error: ", err.name);
    res.status(500).send({ error: err.name });
  });
}
