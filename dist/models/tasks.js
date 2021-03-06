'use strict';
module.exports = function(sequelize, DataTypes) {
  var tasks = sequelize.define('tasks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type : DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : true, 
        min: -90,
        max: 90
      }
    },
     priod: {
      type : DataTypes.DATE,
      validate : {
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tasks;
};