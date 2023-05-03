const jwt = require('jsonwebtoken')
const Users = require('../databases/orm/models/Users.js');
// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {
    if (!req.session.token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verificar si el token es válido
    try {
        const decodedToken = jwt.verify(req.session.token, process.env.JWT_SECRET);
        const user = await Users.findOne({ where: { id: decodedToken.id } });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.user = user;
        // el usuario está autenticado
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error` });
    }
};

module.exports = verifyToken;