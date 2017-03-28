module.exports = function(sequelize, DataTypes) {
  const SearchPreference = sequelize.define('SearchPreference', {
    gender:                     { type: DataTypes.STRING },
    province:                   { type: DataTypes.STRING },
    city:                       { type: DataTypes.STRING },
    age_low:                    { type: DataTypes.INTEGER },
    age_high:                   { type: DataTypes.INTEGER },
    height_low:                 { type: DataTypes.INTEGER },
    height_high:                { type: DataTypes.INTEGER },
  }, {
    underscored: true,
    tableName: 'search_preferences',
    hooks: {
      beforeUpdate: (sp, options, callback) => {
        return callback(null, options);
      }
    },
    instanceMethods: {

      toQueryParam: function() {
        const queryParam = { where: {} };
        const whereKeys = [ 'gender', 'looking_for', 'province', 'city'];
        whereKeys.forEach((key) => {
          if (this[key]) {
            queryParam.where[key] = this[key];
          }
        })
        // age
        if (this.age_low && this.age_high) {
          queryParam.where.dob = { $between: [this.toDobLow(this.age_high), this.toDobHigh(this.age_low)] }
        } else if (this.age_low) {
          queryParam.where.dob = { lte: this.toDobHigh(this.age_low) }
        } else if (this.age_high) {
          queryParam.where.dob = { gte: this.toDobLow(this.age_high) }
        }
        // height
        if (this.height_low && this.height_high) {
          queryParam.where.height = { $or: [{ $eq: null }, { $between: [this.height_low, this.height_high] }] }
        } else if (this.height_high) {
          queryParam.where.height = { $or: [{ $eq: null }, { lte: this.height_high }] }
        } else if (this.height_low) {
          queryParam.where.height = { $or: [{ $eq: null }, { gte: this.height_low }] }
        }

        return queryParam;
      },

      toDobLow: function(age)  {
        const dob = new Date();
        dob.setFullYear(dob.getFullYear() - (Number(age) + 1));
        return dob
      },

      toDobHigh: function(age)  {
        const dob = new Date();
        dob.setFullYear(dob.getFullYear() - Number(age));
        return dob
      },

    }
  });

  return SearchPreference;
};
