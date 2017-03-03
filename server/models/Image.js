module.exports = function(sequelize, DataTypes) {
  const Image =  sequelize.define('Image', {
    url: DataTypes.STRING,
    userAvatar: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    underscored: true,
    classMethods: {
      associate: (models) => {
        Image.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
        });
      },
    },

    instanceMethods: {
      countTasks: function() {
        // how to implement this method ?
      }
    }

  });
  return Image;
};
