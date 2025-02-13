const { Strategy } = require('passport-local');

const boom = require('@hapi/boom');
const bcrypt = require("bcrypt");

const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

console.log("Service instance:", service);
console.log("Is findByEmail a function?", typeof service.findByEmail === 'function');

const LocalStrategy = new Strategy({
        usernameField: 'user_email', 
        passwordField: 'user_password'
    },
    async (user_email, user_password, done) => {
        try {
          const user = await service.getUser(user_email, user_password);
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
);

module.exports = LocalStrategy;