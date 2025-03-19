const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

//  Taille personnalisée du papier pour deux étiquettes de 80mm x 40mm (modifiable)
const pageWidth = 80 * 2.83; // 80 mm en pixels
const pageHeight = 40 * 2.83 * 2; // 80 mm en pixels (2 étiquettes l'une au dessus de l'autre)
const margin = 5; // Marge autour des étiquettes

// Dimensions approximatives pour les codes-barres (en pixels)
const approxBarcodeWidth = pageWidth - 2 * margin; // Utiliser presque toute la largeur
const approxBarcodeHeight = (pageHeight / 2) * 0.8; // Utiliser 80% de la demi-page en hauteur

// Calculer la position Y approximative pour centrer verticalement
const approxY1 = margin + ((pageHeight / 2) - approxBarcodeHeight) / 2; // Centrer le code-barres du haut
const approxY2 = (pageHeight / 2) + margin + ((pageHeight / 2) - approxBarcodeHeight) / 2; // Centrer le code-barres du bas

// Création du document PDF avec des pages contenant deux étiquettes
const outputPath = path.join(__dirname, 'labels.pdf');
const barcodeDir = path.join(__dirname, 'barcodes');
const files = fs.readdirSync(barcodeDir);

const stream = fs.createWriteStream(outputPath);

// ⚡️ On crée un PDF avec des pages de taille 80x80mm (deux étiquettes par page, une au dessus de l'autre)
const doc = new PDFDocument({ size: [pageWidth, pageHeight], margins: { top: margin, left: margin, right: margin, bottom: margin } });
doc.pipe(stream);

for (let i = 0; i < files.length; i += 2) {
    // Première étiquette (en haut)
    const file1 = files[i];
    const filePath1 = path.join(barcodeDir, file1);

    // Ajouter le code-barres avec les dimensions et la position Y approximatives
    doc.image(filePath1, margin, approxY1, { width: approxBarcodeWidth, height: approxBarcodeHeight });

    // Ligne de découpe
    doc.moveTo(0, pageHeight / 2).lineTo(pageWidth, pageHeight / 2).stroke();

    // Deuxième étiquette (en bas, si elle existe)
    if (files[i + 1]) {
        const file2 = files[i + 1];
        const filePath2 = path.join(barcodeDir, file2);

        // Ajouter le code-barres avec les dimensions et la position Y approximatives
        doc.image(filePath2, margin, approxY2, { width: approxBarcodeWidth, height: approxBarcodeHeight });
    }

    // Ajouter une nouvelle page après chaque paire d'étiquettes (sauf la dernière)
    if (i < files.length - 2) {
        doc.addPage({ size: [pageWidth, pageHeight], margins: { top: margin, left: margin, right: margin, bottom: margin } });
    }
}

// Fin du PDF
doc.end();
console.log('✅ Fichier PDF formaté pour imprimante thermique (2 étiquettes par page) : labels.pdf');