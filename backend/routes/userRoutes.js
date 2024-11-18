// routes/userRoutes.js
const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/profile', authenticate, getUserProfile); // Rota protegida para obter o perfil do usuário

module.exports = router;
