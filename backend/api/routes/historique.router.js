const express = require('express');
const passport = require('passport');

const router = express.Router();

const service = new HistoriqueService;

// TO-DO : à faire
router.get('/historique', 
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try{
            const users = await service.find(); 
            res.json(users);
        } catch(error) {
            next(error)
        }
    }
)

module.exports = router;