const boom = require('@hapi/boom');
const bcrypt = require("bcrypt");

const { models } = require('./../libs/sequelize');

class UserService {
    constructor(){
        this.users = [];
    }

    async create(data){
        const hash = await bcrypt.hash(data.user_password, 10); 
        const newUser = await models.User.create({
            ...data,
            user_password: hash
        });
        delete newUser.dataValues.user_password;
        return newUser;
    }

    async find() {
        const rows = await models.User.findAll();
        return rows;
    }

    async findByEmail(user_email){
        console.log("Looking for user with email:", user_email);
        const rta = await models.User.findOne({
            where: { user_email }
        });
        console.log("Result from findOne:", rta);
        return rta;
    }

    async findOne(user_id){
        const user = await models.User.findByPk(user_id);
        if(!user) {
           throw boom.notFound('user not found');
        }
        return user;
    }

    async update(user_id, updateData) {
        const user = await models.User.findByPk(user_id);
        if (!user) {
            throw new Error('User not found');
        }
    
        // Only hash the password if it's being updated
        if (updateData.user_password) {
            const hash = await bcrypt.hash(updateData.user_password, 10);
            updateData.user_password = hash; 
        }
        await user.update(updateData);
        return user;
    }    

    async delete(user_id){
        const user = await models.User.findByPk(id);
        await user.destroy();
        return { user_id }
    }
}

module.exports = UserService;