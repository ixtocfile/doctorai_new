const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'mobilitae_schema',
  username: 'root',
  password: 'test',
  host: 'localhost',
  port: 3306,
  /* A tester :
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
  */ 
});

setupModels(sequelize); 

sequelize.sync({ focer: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });

module.exports = sequelize;