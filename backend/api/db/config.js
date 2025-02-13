const { config } = require('../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

console.log('Database URI:', URI);

module.exports = { 
    development: {
        url: URI, 
        dialect: 'mysql'
    }, 
    production: {
        url: URI, 
        dialect: 'mysql'
    }
}