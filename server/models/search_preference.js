module.exports = function(sequelize, DataTypes) {
  const SearchPreference = sequelize.define('SearchPreference', {
    province:                   { type: DataTypes.STRING },
    city:                       { type: DataTypes.STRING },
    age_low:                     { type: DataTypes.INTEGER },
    age_high:                    { type: DataTypes.INTEGER },
    height_low:                  { type: DataTypes.INTEGER },
    height_high:                 { type: DataTypes.INTEGER },
    sex:                        { type: DataTypes.STRING },
    looking_for:                { type: DataTypes.STRING },
  }, {
    underscored: true,
    tableName: 'search_preferences',
  });

  return SearchPreference;
};
