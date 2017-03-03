const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username:                   { type: DataTypes.STRING },
    email:                      { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    province:                   { type: DataTypes.STRING },
    city:                       { type: DataTypes.STRING },
    dob:                        { type: DataTypes.DATE },
    age:                        { type: DataTypes.VIRTUAL },
    sex:                        { type: DataTypes.STRING },
    looking_for:                { type: DataTypes.STRING },
    firstname:                  { type: DataTypes.STRING },
    lastname:                   { type: DataTypes.STRING },
    avatar_url:                 { type: DataTypes.STRING },
    password_digest:            { type: DataTypes.STRING, validate: { notEmpty: true } },
  	password:                   { type: DataTypes.VIRTUAL, allowNull: false, validate: { notEmpty: true, len: [3, Infinity] } },
  }, {
    underscored: true,
    hooks: {
      beforeCreate: (user, options, callback) => {
        user.email = user.email.toLowerCase();
        user.password_digest = user.generateHash(user.password);
        return callback(null, options);
      },
      beforeUpdate: (user, options, callback) => {
        return callback(null, options);
      },
    },
    classMethods: {
      associate: (models) => {
        // User.hasMany(models.Image, { as: 'images', foreignKey: 'user_id' });
        // User.belongsToMany(models.Like, {  as: 'likes', foreignKey: 'liker_user_id' });
        // User.belongsToMany(models.Image, { as: 'likedUsers', through: models.Like, foreignKey: 'interested_user_id', targetKey: 'liked_user_id' });
        // User.belongsToMany(models.User, { as: 'interestedUsers', through: models.Like, foreignKey: 'liked_user_id', targetKey: 'interested_user_id' });
        // User.belongsToMany(models.User, { as: 'likedUsers', through: 'interested_liked', foreignKey: 'interested_user_id' });
        // User.belongsToMany(models.User, { as: 'interestedUsers', through: 'interested_liked', foreignKey: 'liked_user_id' });
        User.belongsToMany(models.Image, {
            through: models.Like,
            as: "userImagesss"
        });
      },
    },
    // getterMethods: {
    //   address: function()  { return this.state + ', ' + this.country }
    // },
    instanceMethods: {
      comparePassword: function(candidatePassword, cb) {
        return bcrypt.compare(candidatePassword, this.password_digest, (err, isMatch) => {
          return err ? cb(err) : cb(null, isMatch);
        })
      },
      generateHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      updateAttributes: function() {
        this.age = Math.floor((new Date() - this.dob) / 31536000000);
        return this;
      },
    }

  });

  return User;
};
