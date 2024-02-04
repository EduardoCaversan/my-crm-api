const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acesso não autorizado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = { authenticateUser };
