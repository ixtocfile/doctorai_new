const Joi = require('joi');

const mission_id = Joi.number(); 
const mission_company = Joi.string();
const mission_street = Joi.string(); 
const mission_zipcode = Joi.number().min(5);
const mission_city = Joi.string();
const mission_country = Joi.string(); 
const mission_contact_firstname = Joi.string();
const mission_contact_lastname = Joi.string();
const mission_contact_role = Joi.string();
const mission_contact_phone = Joi.string();
const mission_contact_email = Joi.string();
const mission_description = Joi.string(); 
const mission_startDate = Joi.date().iso(); 
const mission_endDate = Joi.date().iso();

const limit = Joi.number().integer(); 
const offset = Joi.number().integer();

const idSchema = Joi.object({
    mission_id: Joi.number().integer().required()
});

const getMissionSchema = Joi.object({
    mission_id: mission_id.required()
})

const createMissionSchema = Joi.object({
    mission_company: mission_company.required(), 
    mission_street: mission_street.required(),
    mission_zipcode: mission_zipcode.required(), 
    mission_city: mission_city.required(),
    mission_country: mission_country.required(), 
    mission_contact_firstname: mission_contact_firstname.required(),
    mission_contact_lastname: mission_contact_lastname.required(), 
    mission_contact_role: mission_contact_role.required(),
    mission_contact_phone: mission_contact_phone.required(), 
    mission_contact_email: mission_contact_email.required(),
    mission_description: mission_description.required(),
    mission_startDate: mission_startDate.required(),
    mission_endDate: mission_endDate.required()
})

const updateMissionSchema = Joi.object({
    mission_company: mission_company,
    mission_street: mission_street,
    mission_zipcode: mission_zipcode, 
    mission_city: mission_city,
    mission_country: mission_country, 
    mission_contact_firstname: mission_contact_firstname,
    mission_contact_lastname: mission_contact_lastname, 
    mission_contact_role: mission_contact_role,
    mission_contact_phone: mission_contact_phone, 
    mission_contact_email: mission_contact_email,
    mission_description: mission_description,
    mission_startDate: mission_startDate,
    mission_endDate: mission_endDate
})

const queryMissionSchema = Joi.object({
    limit, 
    offset
})

module.exports = { idSchema, getMissionSchema, createMissionSchema, updateMissionSchema, queryMissionSchema };