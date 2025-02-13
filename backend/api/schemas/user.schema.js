const Joi = require('joi');

const user_id = Joi.number();

const idSchema = Joi.object({
    user_id: Joi.number().integer().required()
});

const getUserSchema = Joi.object({
    user_id: user_id.required()
})

const createUserSchema = Joi.object({
    user_company: Joi.string(),
    user_function: Joi.string(),
    user_firstname: Joi.string().required(),
    user_lastname: Joi.string().required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(6),
    user_phone: Joi.string(),
    user_street: Joi.string(),
    user_zipcode: Joi.string(),
    user_city: Joi.string().allow(null, ''),
    user_country: Joi.string(),
});

const updateUserSchema = Joi.object({
    user_function: Joi.string().optional(),
    user_firstname: Joi.string().optional(),
    user_lastname: Joi.string().optional(),
    user_email: Joi.string().email().optional(),
    user_phone: Joi.string().pattern(/^[0-9]*$/).allow(null).optional(), 
    user_password_init: Joi.boolean().optional(),
    recovery_token: Joi.string().allow(null, '').optional(),
    user_street: Joi.string().optional(),
    user_zipcode: Joi.string().pattern(/^[0-9]*$/).allow(null).optional(),  
    user_city: Joi.string().optional(),
    user_country: Joi.string().optional(),
});




module.exports = { idSchema, getUserSchema, createUserSchema, updateUserSchema };
