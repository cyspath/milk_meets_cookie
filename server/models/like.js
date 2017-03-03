module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define('Like', {}, {
    underscored: true,
    classMethods: {
      associate: (models) => {
        Like.belongsTo(models.User, { foreignKey: 'liker_user_id' });
        Like.belongsTo(models.User, { foreignKey: 'liked_user_id' });
      },
    },
  });
  return Like;
};
