const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// 📌 Taille personnalisée du papier pour une étiquette de 80mm x 40mm (modifiable)
const pageWidth = 80 * 2.83;  // 80 mm en pixels (1mm = 2.83px)
const pageHeight = 40 * 2.83; // 40 mm en pixels (ajuste si nécessaire)

// Création du document PDF avec des pages individuelles pour chaque étiquette
const outputPath = path.join(__dirname, 'labels.pdf');
const barcodeDir = path.join(__dirname, 'barcodes');
const files = fs.readdirSync(barcodeDir);

const stream = fs.createWriteStream(outputPath);

// ⚡️ On crée un PDF avec plusieurs pages de taille 80x40mm (une étiquette par page)
const doc = new PDFDocument({ size: [pageWidth, pageHeight], margins: { top: 5, left: 5, right: 5, bottom: 5 } });
doc.pipe(stream);

files.forEach((file, index) => {
    const filePath = path.join(barcodeDir, file);

    // Ajout du code-barres centré dans l'étiquette
    doc.image(filePath, 10, 5, { width: pageWidth - 20 }); 

    // Ajouter une nouvelle page après chaque étiquette (sauf la dernière)
    if (index < files.length - 1) {
        doc.addPage({ size: [pageWidth, pageHeight] });
    }
});

// Fin du PDF
doc.end();
console.log('✅ Fichier PDF formaté pour imprimante thermique : labels.pdf');
