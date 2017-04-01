const bcrypt = require('bcrypt-nodejs');
const astrologySign = require('../services/astrology_sign');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username:                   { type: DataTypes.STRING, allowNull: false },
    email:                      { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    province:                   { type: DataTypes.STRING, allowNull: false },
    city:                       { type: DataTypes.STRING, allowNull: false },
    dob:                        { type: DataTypes.DATE, allowNull: false },
    sign:                       { type: DataTypes.STRING },
    height:                     { type: DataTypes.INTEGER },
    gender:                     { type: DataTypes.STRING, allowNull: false },
    looking_for:                { type: DataTypes.STRING, allowNull: false },
    status:                     { type: DataTypes.STRING, allowNull: false, defaultValue: 'Single' }, // Single, Seeing Someone, Married, Divorced
    education:                  { type: DataTypes.STRING },
    industry:                   { type: DataTypes.STRING },
    income:                     { type: DataTypes.INTEGER },
    smokes:                     { type: DataTypes.STRING }, // Doesn't smoke, Smokes occasionally, Smokes regularly
    drinks:                     { type: DataTypes.STRING }, // Doesn't drink, Drinks socially, Drinks regularly
    pets:                       { type: DataTypes.STRING }, // dogs,cats
    avatar_url:                 { type: DataTypes.STRING, defaultValue: 'images/default-user.png' },
    avatar_uploaded:            { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    last_online:                { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    password_digest:            { type: DataTypes.STRING, validate: { notEmpty: true } },
  	password:                   { type: DataTypes.VIRTUAL, allowNull: false, validate: { notEmpty: true, len: [3, Infinity] } },
    p_self_summary:             { type: DataTypes.TEXT },
    p_life_doing:               { type: DataTypes.TEXT },
    p_good_at:                  { type: DataTypes.TEXT },
    p_freetime_activies:        { type: DataTypes.TEXT },
    p_important_things:         { type: DataTypes.TEXT },
    p_thinking_about:           { type: DataTypes.TEXT },
    p_match_criteria:           { type: DataTypes.TEXT },

  }, {
    underscored: true,
    tableName: 'users',
    indexes: [
      { method: 'BTREE', fields: ['province'] },
      { method: 'BTREE', fields: ['city'] },
      { method: 'BTREE', fields: ['dob'] },
      { method: 'BTREE', fields: ['height'] },
      { method: 'BTREE', fields: ['gender'] },
      { method: 'BTREE', fields: ['looking_for'] }
    ],
    hooks: {
      beforeCreate: (user, options, callback) => {
        user.email = user.email.toLowerCase();
        user.password_digest = user.generateHash(user.password);
        user.sign = astrologySign(user.dob);
        return callback(null, options);
      },
      beforeBulkCreate: (users, options, callback) => {
        users.forEach((user) => {
          user.email = user.email.toLowerCase();
          user.password_digest = user.generateHash(user.password);
          user.sign = astrologySign(user.dob);
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

      oppositeGender: (gender) => {
        return gender === 'male' ? 'female' : 'male';
      },

      defaultPreference: function() {
        const age = this.defaultAge();
        const height_low = this.looking_for === 'female' ? 150 : 160;
        const height_high = this.looking_for === 'female' ? 180 : 190;
        return ({
          gender: this.looking_for,
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
