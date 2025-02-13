const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApiKey (req, res, next){
    const apiKey = req.headers['api'] || req.headers['x-api-key'];
    console.log('Received API Key:', apiKey);
    console.log('Configured API Key:', config.apiKey);

    if (apiKey === config.apiKey){
        console.log(config.apiKey)
        next();
    } else {
        console.log('API Key does not match');
        next(boom.unauthorized());
    }
}

function checkAdminRole (req, res, next) {
    console.log('checkAdminRole:', req.user);
    const user = req.user;
    if(user.role === 'admin') {
        next();
    } else {
        next(boom.unauthorized());
    }
}

function checkRoles (...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)){
            next();
        } else {
            next(boom.unauthorized());
        }
    }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }