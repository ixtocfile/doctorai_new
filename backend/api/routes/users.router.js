const express = require('express');
const passport = require('passport');

const UserService = require('../services/user.service');
const validatorHandler = require("./../middlewares/validator.handler");
const { checkRoles } = require('./../middlewares/auth.handler');
const { idSchema, getUserSchema, createUserSchema, updateUserSchema } = require("../schemas/user.schema")

const router = express.Router();

const service = new UserService;

router.get('/', 
    //passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'client'),
    async (req, res, next) => {
        try{
            const users = await service.find(); 
            res.json(users);
        } catch(error) {
            next(error)
        }
    }
)

router.get('/:user_id', 
    //passport.authenticate('jwt', {session: false}),
    //checkRoles('admin', 'client'),
    validatorHandler(getUserSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await service.findOne(user_id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    //checkRoles('admin'),
    validatorHandler(createUserSchema, 'body'), 
    async (req, res, next) => {
        try {
            const body = req.body; 
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch(error) {
            next(error)
            console.error('Error creating user:', error); 
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
})

router.patch('/:user_id',
    //passport.authenticate('jwt', {session: false}),
    //checkRoles('admin'),
    validatorHandler(idSchema, 'params'),  
    validatorHandler(updateUserSchema, 'body'), 
    async (req, res, next) => {
    try {
        console.log('Request body:', req.body);  // 
        const { user_id } = req.params;
        const body = req.body; 
        const user = await service.update(user_id, body);
        res.json(user)
    } catch(error) {
        next(error)
    }
}) 

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin'),
    async (req, res) => {
    const {id} = req.params; 
    const deletedUser = await service.delete(id);
    res.json(deletedUser)
})

module.exports = router;