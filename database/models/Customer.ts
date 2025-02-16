import bcrypt from 'bcrypt';

import sequelize from '@/database';
import { regExValidatePassword } from '@/helpers/validate';
import { customerValidate } from '@/helpers/validate/models';
import { CUSTOMER_ROLES } from '@/src/helpers/constants/enums';

const { Model, DataTypes } = require('sequelize');

class Customer extends Model {}

const cryptPassword = async (customer: { password: string }) => {
  const salt = await bcrypt.genSaltSync(10);
  customer.password = bcrypt.hashSync(customer.password, salt);
};

Customer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: customerValidate.notNullName,
        },
        notNull: {
          msg: customerValidate.notNullName,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: customerValidate.uniqueEmail,
      },
      validate: {
        notEmpty: {
          msg: customerValidate.notNullEmail,
        },
        notNull: {
          msg: customerValidate.notNullEmail,
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: regExValidatePassword,
          msg: customerValidate.wrongPassword,
        },
      },
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isValidRole(value: string[]) {
          if (!Array.isArray(value)) {
            throw new Error(customerValidate.invalidRole);
          }

          const validValues = Object.values(CUSTOMER_ROLES);
          if (!value.every((mode) => validValues.includes(mode as CUSTOMER_ROLES))) {
            throw new Error(customerValidate.invalidRole);
          }
        },
        notNull: {
          msg: customerValidate.notNullRole,
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
      beforeCreate: async (customer: { password: string; email: string }) => {
        if (customer.password) {
          cryptPassword(customer);
        }
      },
      beforeUpdate: async (customer: { password: string; email: string }) => {
        if (customer.password) {
          cryptPassword(customer);
        }
      },
    },
    sequelize,
    modelName: 'Customer',
    defaultScope: {
      attributes: {
        exclude: ['password', 'password_confirmation_token'],
      },
    },
  },
);

export default Customer;
