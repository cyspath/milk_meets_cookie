const User = require('../models').User;

exports.fetchUserDetail = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id }})
  .then((userDetail) => {
    // const data = Object.assign(userDetail, userDetail.age());
    res.send({ userDetail });
  })
  .catch((err) => {
    console.log("500 Error: ", err.name);
    res.status(500).send({ error: err.name });
  });
}
