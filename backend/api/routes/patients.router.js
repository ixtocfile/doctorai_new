const express = require('express');
const passport = require('passport');

const PatientService = require('../services/patient.service');
const validatorHandler = require("../middlewares/validator.handler");
const { idSchema, getPatientSchema, createPatientSchema, updatePatientSchema, queryPatientSchema } = require('../schemas/patient.schema');
const router = express.Router();

const service = new PatientService;

router.get('/', 
    
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(queryPatientSchema, 'query'), 
    async (req, res, next) => {
        try{
            console.log("this works with nodemon");

            const requests = await service.find(req.query); 
            res.json(requests);
        } catch(error) {
            next(error)
        }
    }
)

router.get('/:patient_id', 
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(getPatientSchema, 'params'), 
    async (req, res, next) => {
    try {
        console.log('Coming here for one');
        const { patient_id } = req.params;
        const request = await service.findOne(patient_id);
        res.json(request);
    } catch (error) {
        next(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createPatientSchema,'body'), 
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

router.patch('/:patient_id',
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(idSchema, 'params'),  
    validatorHandler(updatePatientSchema, 'body'), 
    async (req, res, next) => {
    try {
        const { patient_id } = req.params;
        const body = req.body; 
        const request = await service.update(patient_id , body);
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