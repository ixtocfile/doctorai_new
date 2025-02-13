const express = require('express');
const passport = require('passport');

const DocumentService = require('../services/document.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require("./../middlewares/validator.handler");
const { idSchema, getDocumentSchema, createDocumentSchema, updateDocumentSchema, queryDocumentSchema } = require('./../schemas/document.schema');

const router = express.Router();

const service = new DocumentService;

router.get('/', 
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin'),
    validatorHandler(queryDocumentSchema, 'query'), 
    async (req, res, next) => {
        try{
            const documents = await service.find(req.query); 
            res.json(documents);
        } catch(error) {
            next(error)
        }
    }
)

router.get('/:id', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getDocumentSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const document = await service.findOne(id);
        res.json(document);
    } catch(error) {
        next(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createDocumentSchema, 'body'), 
    async (req, res, next) => {
        try {
            const body = req.body; 
            const newDocument = await service.create(body);
            res.status(201).json(newDocument);
        } catch(error) {
            next(error)
        }
    })

router.patch('/:id', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(idSchema, 'params'), 
    validatorHandler(updateDocumentSchema, 'body'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body; 
        const document = await service.update(id, body);
        res.json(document)
    } catch(error) {
        next(error)
    }
}) 

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
    const {id} = req.params; 
    const deletedDocument = await service.delete(id);
    res.json(deletedDocument)
})

module.exports = router;