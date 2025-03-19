const escpos = require('escpos');
escpos.USB = require('escpos-usb'); // Si USB
const path = require('path');

const device = new escpos.USB();
const printer = new escpos.Printer(device);

const pdfPath = path.join(__dirname, 'labels.pdf');

device.open((err) => {
    if (err) {
        console.error('Erreur de connexion avec l’imprimante', err);
        return;
    }
    
    printer
        .align('ct')
        .text('Impression des étiquettes...')
        .newLine()
        .printPDF(pdfPath)
        .cut()
        .close();
    
    console.log('✅ Impression réussie');
});
