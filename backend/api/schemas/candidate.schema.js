const Joi = require('joi');

const id = Joi.number(); 
const candidate_firstname = Joi.string(); 
const candidate_lastname = Joi.string(); 
const candidate_nationality =  Joi.string(); 
const candidate_project = Joi.string();

const idSchema = Joi.object({
    id: Joi.number().integer().required()
});

const getCandidateSchema = Joi.object({
    id: id.required()
})

const createCandidateSchema = Joi.object({
    candidate_firstname: candidate_firstname.required(), 
    candidate_lastname:  candidate_lastname.required(),
    candidate_nationality: candidate_nationality.required(), 
    candidate_project:  candidate_project.required()
})

const updateCandidateSchema = Joi.object({
    candidate_firstname: candidate_firstname,
    candidate_lastname: candidate_lastname,
    candidate_nationality: candidate_nationality,
    candidate_project:  candidate_project
})

module.exports = { idSchema, getCandidateSchema, createCandidateSchema, updateCandidateSchema };