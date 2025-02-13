const Joi = require('joi');

const id = Joi.string(); 
const document_owner = Joi.number().integer(); 
const document_label = Joi.string(); 
const document_emplacement_disque =  Joi.string(); 
const document_type = Joi.string();

const limit = Joi.number().integer(); 
const offset = Joi.number().integer();

const idSchema = Joi.object({
    id: Joi.number().integer().required()
});

const getDocumentSchema = Joi.object({
    id: id.required()
})

const createDocumentSchema = Joi.object({
    document_owner: document_owner.required(), 
    document_label: document_label.required(),
    document_emplacement_disque: document_emplacement_disque.required(), 
    document_type: document_type.required()
})

const updateDocumentSchema = Joi.object({
    document_owner: document_owner,
    document_label: document_label,
    document_emplacement_disque: document_emplacement_disque,
    document_type: document_type
})

const queryDocumentSchema = Joi.object({
    limit, 
    offset
})

module.exports = { idSchema, getDocumentSchema, createDocumentSchema, updateDocumentSchema, queryDocumentSchema };