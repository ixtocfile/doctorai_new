const express = require('express');
const passport = require('passport');

const MissionService = require('../services/mission.service');
const validatorHandler = require("./../middlewares/validator.handler");
const { idSchema, getMissionSchema, createMissionSchema, updateMissionSchema, queryMissionSchema } = require('./../schemas/mission.schema');

const router = express.Router();

const service = new MissionService;

router.get('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(queryMissionSchema, 'query'), 
    async (req, res, next) => {
        try{
            const missions = await service.find(req.query); 
            res.json(missions);
        } catch(error) {
            next(error)
        }
    }
)

router.get('/:mission_id', 
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(getMissionSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { mission_id } = req.params;
        const mission = await service.findOne(mission_id);
        res.json(mission);
    } catch(error) {
        next(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createMissionSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body; 
            const newMission = await service.create(body);
            res.status(201).json(newMission);
        } catch(error) {
            next(error)
        }
})

router.patch('/:mission_id', 
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(idSchema, 'params'), 
    validatorHandler(updateMissionSchema, 'body'), 
    async (req, res, next) => {
    try {
        const { mission_id } = req.params;
        const body = req.body; 
        const mission = await service.update(mission_id, body);
        res.json(mission)
    } catch(error) {
        next(error)
    }
}) 

router.delete('/:mission_id', 
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
    const {id} = req.params; 
    const deletedMission = await service.delete(id);
    res.json(deletedMission)
})

module.exports = router;