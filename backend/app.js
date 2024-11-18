// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const twitRoutes = require('./routes/twitRoutes');

const app = express();

// Configuração do CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/twits', twitRoutes);

// Servir arquivos estáticos do diretório "public"
app.use(express.static('public'));

module.exports = app;
