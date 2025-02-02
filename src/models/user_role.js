'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_role.init({
  UserId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  RoleId: {  
    type: DataTypes.INTEGER,
    allowNull: false, 
  }
}, {
  sequelize,
  modelName: 'User_role',
  tableName: 'User_roles',  // Explicitly set the table name
});
  return User_role;
};