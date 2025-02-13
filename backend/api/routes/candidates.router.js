const express = require('express');
const passport = require('passport');

const CandidateService = require('../services/candidate.service');
const validatorHandler = require("./../middlewares/validator.handler");
const { idSchema, getCandidateSchema, createCandidateSchema, updateCandidateSchema } = require('./../schemas/candidate.schema');

const router = express.Router();

const service = new CandidateService;

router.get('/', 
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try{
            const candidates = await service.find(); 
            res.json(candidates);
        } catch(error) {
            next(error)
        }
    }
)

router.get('/:id', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getCandidateSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const candidate = await service.findOne(id);
        res.json(candidate);
    } catch(error) {
        next(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createCandidateSchema, 'body'), 
    async (req, res, next) => {
        try {
            const body = req.body; 
            const newCandidate = await service.create(body);
            res.status(201).json(newCandidate);
        } catch(error) {
            next(error)
        }
})

router.patch('/:id', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(idSchema, 'params'), 
    validatorHandler(updateCandidateSchema, 'body'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body; 
        const candidate = await service.update(id, body);
        res.json(candidate)
    } catch(error) {
        next(error)
    }
}) 

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
    const {id} = req.params; 
    const deletedCandidate = await service.delete(id);
    res.json(deletedCandidate)
})

module.exports = router;