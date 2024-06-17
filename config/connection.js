const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      //host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // Enable SSL
          rejectUnauthorized: false, // This is typically set to false for self-signed certificates
        }
      },
    }
  );

module.exports = sequelize;
