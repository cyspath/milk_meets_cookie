module.exports = function(sequelize, DataTypes) {
  const Image =  sequelize.define('Image', {
    url: DataTypes.STRING,
    userAvatar: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {

    classMethods: {
      associate: (models) => {
        Image.belongsTo(models.User, {
          foreignKey: 'userId',
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
