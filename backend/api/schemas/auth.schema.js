const Joi = require('joi');

const idSchema = Joi.object({
    user_id: Joi.number().integer().required()
});

const loginUser = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(6),
})


module.exports = { idSchema, loginUser };
