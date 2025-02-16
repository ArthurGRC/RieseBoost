import pg from 'pg';

const { Sequelize } = require('sequelize');

const initSequelize = () => {
  if (process.env.DATABASE_URL)
    return new Sequelize(process.env.DATABASE_URL, {
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      dialectModule: pg,
    });

  if (process.env.NODE_ENV === 'test')
    return new Sequelize(process.env.POSTGRES_DB_NAME_TEST, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
      dialect: 'postgres',
      dialectModule: pg,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      logging: false,
    });

  return new Sequelize(process.env.POSTGRES_DB_NAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    dialect: 'postgres',
    dialectModule: pg,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
  });
};

const sequelize = initSequelize();

export default sequelize;
