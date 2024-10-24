const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Utilisateur déjà existant.' });
        }

        const user = new User({ username, password, role });
        await user.save();

        // Si l'inscription réussit
        console.log('Utilisateur créé avec succès:', user.username);
        res.status(201).json({ message: 'Utilisateur créé' });

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error); // Affiche l'erreur dans le terminal
        res.status(500).json({ message: 'Erreur lors de l\'inscription' }); // Renvoie une erreur en JSON
    }
};

// Connexion d'un utilisateur existant
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Si la connexion réussit
        console.log('Utilisateur connecté avec succès:', user.username);
        res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error); // Affiche l'erreur dans le terminal
        res.status(500).json({ message: 'Erreur lors de la connexion' }); // Renvoie une erreur en JSON
    }
};

module.exports = {
    registerUser,
    loginUser
};
