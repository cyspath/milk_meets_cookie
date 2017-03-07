module.exports = function(sequelize, DataTypes) {
  const SearchPreference = sequelize.define('SearchPreference', {
    sex:                        { type: DataTypes.STRING },
    looking_for:                { type: DataTypes.STRING },
    province:                   { type: DataTypes.STRING },
    city:                       { type: DataTypes.STRING },
    age_low:                    { type: DataTypes.INTEGER },
    age_high:                   { type: DataTypes.INTEGER },
    height_low:                 { type: DataTypes.INTEGER },
    height_high:                { type: DataTypes.INTEGER },
  }, {
    underscored: true,
    tableName: 'search_preferences',
    instanceMethods: {

      toQueryParam: function() {
        const queryParam = { where: {} };
        const whereKeys = [ 'sex', 'looking_for', 'province', 'city'];
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
          queryParam.where.height = { $between: [this.height_low, this.height_high] }
        } else if (this.height_high) {
          queryParam.where.height = { lte: this.height_high }
        } else if (this.height_low) {
          queryParam.where.height = { gte: this.height_low }
        }

        return queryParam;
      },

      toDobLow: function(age)  {
        const dob = new Date();
        const n = Number(age);
        dob.setFullYear(dob.getFullYear() - (age + 1));
        return dob
      },

      toDobHigh: function(age)  {
        const dob = new Date();
        const n = Number(age);
        dob.setFullYear(dob.getFullYear() - (age - 1));
        return dob
      },

    }
  });

  return SearchPreference;
};
