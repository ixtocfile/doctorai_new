const Joi = require('joi');

const id = Joi.number(); 
const request_created_by = Joi.string();
const request_created_at = Joi.date().min('now');
const user_id = Joi.number().integer();
const request_status =  Joi.string();
const request_comment = Joi.string();
const request_validated_by = Joi.string(); 
const request_validated_at = Joi.date().iso();

const limit = Joi.number().integer(); 
const offset = Joi.number().integer();

const idSchema = Joi.object({
    id: Joi.number().integer().required()
});

const getRequestSchema = Joi.object({
    id: id.required()
})

const createRequestSchema = Joi.object({
    user_firstname: Joi.string().required(),
    user_lastname: Joi.string().required(),
    user_function: Joi.string().optional(),
    user_email: Joi.string().email().required(),
    user_phone: Joi.number().required(),
    user_street: Joi.string().required(),
    user_zipcode: Joi.string().required(),
    user_city: Joi.string().required(),
    user_country: Joi.string().required(),

    mission_company: Joi.string().required(),
    mission_street: Joi.string().required(),
    mission_zipcode: Joi.string().required(),
    mission_city: Joi.string().required(),
    mission_country: Joi.string().required(),
    mission_contact_role: Joi.string().optional(),
    mission_contact_firstname: Joi.string().optional(),
    mission_contact_lastname: Joi.string().optional(),
    mission_contact_phone: Joi.string().optional(),
    mission_contact_email: Joi.string().email().optional(),
    mission_description: Joi.string().required(),
    mission_startDate: Joi.date().iso().required(),  
    mission_endDate: Joi.date().iso().required()
});

const updateRequestSchema = Joi.object({
    request_created_by: request_created_by,
    request_created_at:request_created_at,
    request_status: request_status,
    request_comment: request_comment,
    request_validated_by: request_validated_by,
    request_validated_at: request_validated_at,
})

const queryRequestSchema = Joi.object({
    limit, 
    offset
})

module.exports = { idSchema, getRequestSchema, createRequestSchema, updateRequestSchema, queryRequestSchema };