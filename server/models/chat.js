module.exports = function(sequelize, DataTypes) {
  const Chat = sequelize.define('Chat', {
    id:                         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_receiver_ids:        { type: DataTypes.STRING, validate: { notEmpty: true } },
    sender_id:                  { type: DataTypes.INTEGER },
    receiver_id:                { type: DataTypes.INTEGER },
    message:                    { type: DataTypes.TEXT },
    read:                       { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  }, {
    underscored: true,
    tableName: 'chats',
    indexes: [
      { method: 'BTREE', fields: ['sender_id', 'receiver_id', 'sender_receiver_ids'] },
    ],
    hooks: {
      beforeCreate: (chat, options, callback) => {
        chat.sender_receiver_ids = [Number(chat.sender_id), Number(chat.receiver_id)].sort().join('-')
        return callback(null, options);
      },
      beforeBulkCreate: (chats, options, callback) => {
        chats.forEach((chat) => {
          chat.sender_receiver_ids = [Number(chat.sender_id), Number(chat.receiver_id)].sort().join('-')
        })
        return callback(null, options);
      }
    }
  });
  return Chat;
};
