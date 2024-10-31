const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware pour vérifier le token JWT
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé, accès non autorisé.' });
            }
            next();
        } catch (error) {
            console.error("Erreur de token:", error.message);
            return res.status(401).json({ message: 'Non autorisé, token invalide.' });
        }
    } else {
        return res.status(401).json({ message: 'Non autorisé, pas de token fourni.' });
    }
};

module.exports = { protect };
