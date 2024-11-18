// controllers/twitController.js
const { Twit, User } = require('../models');

// controllers/twitController.js
exports.getAllTwits = async (req, res) => {
    try {
        const twits = await Twit.findAll({
            include: [
                {
                    model: User,
                    as: 'User', // Especifica o alias usado na associação
                    attributes: ['username']
                }
            ],
            order: [['createdAt', 'DESC']],
        });
        res.json(twits);
    } catch (error) {
        console.error('Erro ao buscar "twits":', error);
        res.status(500).json({ message: 'Erro ao buscar "twits"', error });
    }
};

// controllers/twitController.js
exports.createTwit = async (req, res) => {
    const { content } = req.body;

    try {
        const twit = await Twit.create({ content, userId: req.user.id });

        // Buscar o twit recém-criado com os dados do usuário
        const newTwit = await Twit.findByPk(twit.id, {
            include: [
                {
                    model: User,
                    as: 'User', // Especifica o alias usado na associação
                    attributes: ['username']
                }
            ]
        });

        res.status(201).json(newTwit);
    } catch (error) {
        console.error('Erro ao criar "twit":', error);
        res.status(500).json({ message: 'Erro ao criar "twit"', error });
    }
};
