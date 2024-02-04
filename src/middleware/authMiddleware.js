const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acesso não autorizado.' });
    }

    next();
};

module.exports = { authenticateUser };
