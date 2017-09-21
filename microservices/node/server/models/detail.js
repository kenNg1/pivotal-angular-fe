'use strict';
module.exports = (sequelize, DataTypes) => {
  var Detail = sequelize.define('Detail', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    tier: DataTypes.STRING,
    nickname: DataTypes.STRING,
    image: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Detail.belongsTo(models.User, { foreignKey: 'user_id' , onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      }
    }
  });
  return Detail;
};