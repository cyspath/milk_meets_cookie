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
        let pref = user.defaultPreference();
        user.createSearchPreference(pref);
        return callback(null, options);
      },
      afterBulkCreate: (users, options, callback) => {
        users.forEach((user) => {
          let pref = user.defaultPreference();
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

      defaultPreference: function() {
        const age = this.defaultAge();
        const height_low = this.looking_for === 'female' ? 150 : 160;
        const height_high = this.looking_for === 'female' ? 180 : 190;
        return ({
          sex: this.looking_for,
          looking_for: null,
          province: this.province,
          city: this.city,
          age_low: age.age_low,
          age_high: age.age_high,
          height_low,
          height_high,
        });
      },

      defaultAge: function() {
        let age_low, age_high;
        if (this.looking_for === 'male') {
          age_low = ( this.age - 5) < 18 ? 18 : ( this.age - 5);
          age_high = ( this.age + 10) < 18 ? 18 : ( this.age + 10);
        } else {
          age_low = ( this.age - 10) < 18 ? 18 : ( this.age - 10);
          age_high = ( this.age + 5) < 18 ? 18 : ( this.age + 5);
        }
        return { age_low, age_high }
      }


    }

  });

  return User;
};
