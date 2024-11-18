// routes/authRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
    '/register',
    [
        check('username').notEmpty().withMessage('O nome de usuário é obrigatório'),
        check('email').isEmail().withMessage('Forneça um e-mail válido'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('A senha deve ter pelo menos 6 caracteres'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    register
);

router.post('/login', login);

module.exports = router;
