module.exports = function(sequelize, DataTypes) {
  const Chat = sequelize.define('Chat', {
    id:                         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id:                  { type: DataTypes.INTEGER },
    receiver_id:                { type: DataTypes.INTEGER },
    message:                    { type: DataTypes.STRING },
    read:                       { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  }, {
    underscored: true,
    tableName: 'chats',
    indexes: [
      { method: 'BTREE', fields: ['sender_id', 'receiver_id'] },
    ],
  });
  return Chat;
};
