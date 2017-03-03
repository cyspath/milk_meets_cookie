module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define('Like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
  return Like;
};
// const Ingredient = Model.define("Ingredient");
