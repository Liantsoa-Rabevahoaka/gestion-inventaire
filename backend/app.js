require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const zoneRoutes = require('./routes/zoneRoutes'); // Import des routes zones
const authRoutes = require('./routes/authRoutes'); // Import des routes d'authentification
const app = express();

app.use(express.json());

// Utilise les routes des articles
app.use('/api/articles', articleRoutes);
app.use('/api/zones', zoneRoutes); // Utilisation des routes zones
app.use('/api/auth', authRoutes); // Utilisation des routes d'authentification

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT,(error)=>{
    if (!error) {
        console.log("Server Running on Port "+PORT)
    }
    else {
        console.log("Error : "+error)
    }
})
