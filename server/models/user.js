const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username:                   { type: DataTypes.STRING },
    email:                      { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    province:                   { type: DataTypes.STRING },
    city:                       { type: DataTypes.STRING },
    dob:                        { type: DataTypes.DATE },
    height:                     { type: DataTypes.INTEGER },
    sex:                        { type: DataTypes.STRING },
    looking_for:                { type: DataTypes.STRING },
    firstname:                  { type: DataTypes.STRING },
    lastname:                   { type: DataTypes.STRING },
    avatar_url:                 { type: DataTypes.STRING },
    password_digest:            { type: DataTypes.STRING, validate: { notEmpty: true } },
  	password:                   { type: DataTypes.VIRTUAL, allowNull: false, validate: { notEmpty: true, len: [3, Infinity] } },
  }, {
    underscored: true,
    tableName: 'users',
    hooks: {
      beforeCreate: (user, options, callback) => {
        user.email = user.email.toLowerCase();
        user.password_digest = user.generateHash(user.password);
        return callback(null, options);
      },
      beforeBulkCreate: (users, options, callback) => {
        users.forEach((user) => {
          user.email = user.email.toLowerCase();
          user.password_digest = user.generateHash(user.password);
        })
        return callback(null, options);
      },
      beforeUpdate: (user, options, callback) => {
        return callback(null, options);
      },
      afterCreate: (user, options, callback) => {
        let pref = user.defaultPreference(user);
        user.createSearchPreference(pref);
        return callback(null, options);
      },
      afterBulkCreate: (users, options, callback) => {
        users.forEach((user) => {
          let pref = user.defaultPreference(user);
          user.createSearchPreference(pref);
        })
        return callback(null, options);
      }
    },
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Image);
        User.hasOne(models.SearchPreference);
        User.belongsToMany(models.User, { as: 'LikedUsers', through: models.Like, foreignKey: 'interested_user_id' });
        User.belongsToMany(models.User, { as: 'InterestedUsers', through: models.Like, foreignKey: 'liked_user_id' });
      },
    },
    getterMethods: {
      age: function()  { return Math.floor((new Date() - this.dob) / 31536000000) },
    },
    instanceMethods: {

      comparePassword: function(candidatePassword, cb) {
        return bcrypt.compare(candidatePassword, this.password_digest, (err, isMatch) => {
          return err ? cb(err) : cb(null, isMatch);
        })
      },

      generateHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },

      oppositeSex: (sex) => {
        return sex === 'male' ? 'female' : 'male';
      },

      defaultPreference: (user) => {
        return ({ province: user.province, city: user.city, sex: user.looking_for, looking_for: user.sex });
      },

    }

  });

  return User;
};
