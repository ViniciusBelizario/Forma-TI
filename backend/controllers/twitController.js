const Twit  = require('../models/Twit');

exports.getAllTwits = async (req, res) => {
    try {
        const twits = await Twit.findAll();
        res.json(twits);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar "twits"', error });
    }
};

exports.createTwit = async (req, res) => {
    const { content } = req.body;

    try {
        const twit = await Twit.create({ content, userId: req.user.id });
        res.status(201).json(twit);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar "twit"', error });
    }
};
