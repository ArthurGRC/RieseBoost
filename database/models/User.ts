import bcrypt from "bcrypt";

import { regExValidatePassword } from '@/helpers/validate';

import sequelize from '@/database';
import { userValidate } from "@/helpers/validate/models";
import { USER_ROLES } from "@/src/helpers/constants/enums";

const { Model, DataTypes } = require('sequelize');

class User extends Model { }

const cryptPassword = async (user: { password: string }) => {
  const salt = await bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
};

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: userValidate.notNullName,
        },
        notNull: {
          msg: userValidate.notNullName,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: userValidate.uniqueEmail,
      },
      validate: {
        notEmpty: {
          msg: userValidate.notNullEmail,
        },
        notNull: {
          msg: userValidate.notNullEmail,
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: regExValidatePassword,
          msg: userValidate.wrongPassword,
        },
      },
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isValidRole(value: string[]) {
          if (!Array.isArray(value)) {
            throw new Error(userValidate.invalidRole);
          }

          const validValues = Object.values(USER_ROLES);
          if (!value.every(mode => validValues.includes(mode as USER_ROLES))) {
            throw new Error(userValidate.invalidRole);
          }
        },
        notNull: {
          msg: userValidate.notNullRole,
        },
      },
    },
    password_confirmation_token: {
      type: DataTypes.STRING,
      allownull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user: { password: string; email: string }) => {
        if (user.password) {
          cryptPassword(user);
        }
      },
      beforeUpdate: async (user: { password: string; email: string }) => {
        if (user.password) {
          cryptPassword(user);
        }
      },
    },
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['password', 'password_confirmation_token'],
      },
    },
  },
);

export default User;
