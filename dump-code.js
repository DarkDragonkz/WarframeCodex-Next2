const fs = require('fs');
const path = require('path');

// Configurazione
const DIR_TO_SCAN = './src'; // Cartella da scansionare
const OUTPUT_FILE = 'TUTTO_IL_CODICE.txt'; // File di output
const EXTENSIONS = ['.js', '.jsx', '.css', '.json']; // Estensioni da includere
const IGNORE_DIRS = ['node_modules', '.next', '.git']; // Cartelle da ignorare

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (EXTENSIONS.includes(path.extname(file))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(DIR_TO_SCAN);
let outputContent = `DATA DUMP: ${new Date().toISOString()}\n\n`;

console.log(`Trovati ${files.length} file in ${DIR_TO_SCAN}...`);

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    // Aggiungo un'intestazione per capire di che file si tratta
    outputContent += `\n\n==================================================\n`;
    outputContent += `FILE: ${file}\n`;
    outputContent += `==================================================\n\n`;
    outputContent += content;
  } catch (err) {
    console.error(`Errore leggendo ${file}:`, err.message);
  }
});

fs.writeFileSync(OUTPUT_FILE, outputContent);
console.log(`Fatto! Carica il file "${OUTPUT_FILE}" nella chat.`);