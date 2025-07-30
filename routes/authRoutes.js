const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../middleware/validateUser');

// Inscription
router.post('/register', validateUser, authController.register);

// Connexion (ne valide que email/password)
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  next();
}, authController.login);

module.exports = router;
