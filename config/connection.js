const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false, // Disable logging; default: console.log
      dialectOptions: {
        ssl: {
          require: true, // This is necessary for SSL connection to Render PostgreSQL
          rejectUnauthorized: false, // This may be necessary based on your PostgreSQL setup on Render
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
      }
    );

module.exports = sequelize;
