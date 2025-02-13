const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login', async (req, res, next) => {
  const { user_email, user_password } = req.body;
  try {
      const user = await service.getUser(user_email, user_password);
      const { token, user: userData } = service.signToken(user);

      // Sending back token and user data
      res.json({
          message: 'Login successful',
          token,
          user: userData
      });
  } catch (error) {
      next(error);
  }
});

router.post(
  '/recovery', 
  async (req, res, next) => {
    try {
      const { user_email } = req.body; 
      console.log('Recovery requested for:', user_email); 
      if (!user_email) {
        return res.status(400).json({ message: 'user_email is required' }); // Validate that 'user_email' is provided
      }
  
      const rta = await service.sendRecovery(user_email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;