const User = require('../models').User;
const Like = require('../models').Like;

exports.fetchUserDetail = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id }})
  .then((user) => {
    user.updateAttributes();
    res.send({ user });
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
