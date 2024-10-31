const Zone = require('../models/zone');

// Middleware pour vérifier que l'utilisateur a scanné une zone
const checkZoneScan = async (req, res, next) => {
    if (!req.session || !req.session.scannedZoneId) {
        return res.status(403).json({ message: 'Veuillez scanner une zone avant d\'accéder aux articles.' });
    }

    try {
        const zone = await Zone.findById(req.session.scannedZoneId);
        if (!zone) {
            return res.status(404).json({ message: 'Zone scannée introuvable.' });
        }
        req.scannedZone = zone;
        next();
    } catch (error) {
        console.error("Erreur lors de la vérification de la zone scannée:", error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la vérification de la zone.' });
    }
};

// Middleware pour initialiser la zone scannée
const scanZone = (req, res) => {
    const { zoneId } = req.params;

    if (!zoneId) {
        return res.status(400).json({ message: 'ID de zone invalide.' });
    }

    req.session.scannedZoneId = zoneId; // Enregistre la zone scannée dans la session
    res.status(200).json({ message: 'Zone scannée avec succès', zoneId });
};

module.exports = { checkZoneScan, scanZone };
