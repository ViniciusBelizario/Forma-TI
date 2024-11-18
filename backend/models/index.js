// models/index.js
const sequelize = require('./db');
const User = require('./User');
const Twit = require('./Twit');

// Definir associações
User.hasMany(Twit, { foreignKey: 'userId' });
Twit.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar modelos com o banco de dados:', error);
    });

module.exports = { sequelize, User, Twit };
