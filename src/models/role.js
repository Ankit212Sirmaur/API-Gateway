'use strict';
const {
  Model
} = require('sequelize');
const { Enums } = require('../utils/common')
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = Enums.ROLE_TYPE
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /**
     * one user can have many roles
     * and role can belong to many users
     * many - many assocations => need to setup through tables ('join')
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: 'User_role', as: 'users' })  // Changed 'user' to 'users'
    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM,
      values: [ADMIN, CUSTOMER, FLIGHT_COMPANY],
      allowNull: false,
      defaultValue: CUSTOMER,
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};