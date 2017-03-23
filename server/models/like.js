module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define('Like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    underscored: true,
    defaultScope: { where: { active: true } },
  });
  return Like;
};
