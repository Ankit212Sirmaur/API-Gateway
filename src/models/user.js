'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { ServerConfig } = require('../config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, { through: 'User_role', as: 'roles' })  // Changed 'Role' to 'roles'
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // hooks
  User.beforeCreate(function encrypt(user) {
    const hashpassword = bcrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS);
    user.password = hashpassword;
    console.log('user', user);
  })
  return User;
};