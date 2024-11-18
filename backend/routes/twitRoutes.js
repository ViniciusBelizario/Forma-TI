// routes/twitRoutes.js
const express = require('express');
const { getAllTwits, createTwit } = require('../controllers/twitController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', getAllTwits); // Retorna todos os "twits"
router.post('/', authenticate, createTwit); // Cria um novo "twit"

module.exports = router;
