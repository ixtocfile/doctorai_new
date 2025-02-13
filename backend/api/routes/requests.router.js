const express = require('express');
const passport = require('passport');

const RequestService = require('../services/request.service');
const validatorHandler = require("./../middlewares/validator.handler");
const { idSchema, getRequestSchema, createRequestSchema, updateRequestSchema, queryRequestSchema } = require('./../schemas/request.schema');

const router = express.Router();

const service = new RequestService;

router.get('/', 
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(queryRequestSchema, 'query'), 
    async (req, res, next) => {
        try{
            const requests = await service.find(req.query); 
            res.json(requests);
        } catch(error) {
            next(error)
        }
    }
)

router.get('/:id', 
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(getRequestSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const request = await service.findOne(id);
        res.json(request);
    } catch (error) {
        next(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createRequestSchema,'body'), 
    async (req, res, next) => {
        try {
            const body = req.body; 
            const newRequest = await service.create(body);
            res.status(201).json(newRequest);
        } catch(error) {
            next(error)
        }
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjYxMzI5NDl9.nbP1NpGf0CYgJjYG744wxVQgqXXVp_xtm4AckhCK37I

router.patch('/:id',
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(idSchema, 'params'),  
    validatorHandler(updateRequestSchema, 'body'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body; 
        const request = await service.update(id, body);
        res.json(request)
    } catch(error) {
        next(error)
    }
}) 

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
    const {id} = req.params; 
    const deletedRequest = await service.delete(id);
    res.json(deletedRequest)
})

module.exports = router;