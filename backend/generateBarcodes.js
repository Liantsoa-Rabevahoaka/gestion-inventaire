const XLSX = require('xlsx');
const bwipjs = require('bwip-js');
const fs = require('fs-extra');
const path = require('path');

// Charger le fichier Excel
const filePath = path.join(__dirname, 'data/articles.xlsx'); // Nom du fichier Excel
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0]; // Première feuille
const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Créer le dossier pour stocker les codes-barres
const barcodeDir = path.join(__dirname, 'barcodes');
fs.ensureDirSync(barcodeDir);

// Fonction pour nettoyer les noms de fichiers
function sanitizeFilename(code) {
    return code.replace(/[^a-zA-Z0-9-_]/g, '_'); // Remplace les caractères interdits par "_"
}

// Fonction pour générer un code-barres
async function generateBarcode(code) {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: 'code128',
            text: code,
            scale: 3,
            height: 10,
            includetext: true,
        }, (err, png) => {
            if (err) {
                reject(err);
            } else {
                const sanitizedCode = sanitizeFilename(code); // Nettoyer le code
                const filePath = path.join(barcodeDir, `${sanitizedCode}.png`); // Utiliser le code nettoyé
                fs.writeFileSync(filePath, png);
                resolve(filePath);
            }
        });
    });
}

// Génération de tous les codes-barres
async function generateAllBarcodes() {
    console.log('Début de la génération des codes-barres...');
    for (let i = 0; i < sheet.length; i++) {
        const code = sheet[i]['Code']; // Assurez-vous que la colonne dans Excel est nommée "Code"
        if (code) {
            await generateBarcode(code);
            console.log(`✅ Code-barres généré : ${code}`);
        }
    }
    console.log('✅ Tous les codes-barres ont été générés avec succès !');
}

generateAllBarcodes();
