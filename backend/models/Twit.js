// models/Twit.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Twit = sequelize.define('Twit', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Twit;
