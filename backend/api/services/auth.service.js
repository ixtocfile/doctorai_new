const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./user.service');

class AuthService {
    constructor() {
        this.userService = new UserService(); 
    }

    async getUser(user_email, user_password) {
        const user = await this.userService.findByEmail(user_email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.user_password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return {
            user,
            token
        };
    }

    async sendRecovery(user_email) {
        console.log('Attempting to find user with email:', user_email);
        const user = await this.userService.findByEmail(user_email); 
        if (!user) {
            console.log('User not found:', user_email); 
            throw boom.unauthorized();
        }
        console.log('User found:', user.user_id);
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
        const link = `http://localhost:3000/reset?token=${token}`;
        console.log('Generated recovery token:', token);
        await this.userService.update(user.user_id, { recoveryToken: token }); 
        const mail = {
            from: config.mailerEmail,
            to: `${user.user_email}`,
            subject: "Email para recuperar contraseña",
            html: `<b>Ingresa a este link => ${link}</b>`,
        }
        const rta = await this.sendMail(mail);
        return rta;
    }

    async sendMail(user_email) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            secure: false,
            port: 587,
            auth: {
                user: config.mailerEmail,
                pass: config.mailerPassword
            }
        });
        await transporter.sendMail(user_email);
        return { message: 'mail sent' };
    }
}

module.exports = AuthService;
