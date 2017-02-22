const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username:                   { type: DataTypes.STRING },
    email:                      { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    province:                   { type: DataTypes.STRING },
    city:                       { type: DataTypes.STRING },
    dob:                        { type: DataTypes.DATE },
    sex:                        { type: DataTypes.STRING },
    looking_for:                { type: DataTypes.STRING },
    firstname:                  { type: DataTypes.STRING },
    lastname:                   { type: DataTypes.STRING },
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
        User.hasMany(models.Image, {
          foreignKey: 'userId',
          as: 'images',
        });
      },
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
    }

  });

  return User;
};
