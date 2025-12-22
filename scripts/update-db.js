// scripts/update-db.js
const fs = require('fs');
const path = require('path');
// Importiamo la libreria (assicurati che sia installata nel package.json)
const Items = require('warframe-items');

console.log("⏳ Inizio aggiornamento database automatico...");

const allCategories = [
    'Warframes', 'Primary', 'Secondary', 'Melee', 'Archwing', 
    'Arch-Gun', 'Arch-Melee', 'Sentinels', 'Pets', 'Mods', 
    'Relics', 'Skins', 'Gear', 'Resources', 'Fish', 
    'Glyphs', 'Sigils', 'Enemy', 'Misc', 'Quest'
];

// Percorso dove salvare i file (nella cartella public/database_api)
const outputDir = path.join(__dirname, '..', 'public', 'database_api');

// Crea la cartella se non esiste
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let totalItems = 0;

allCategories.forEach(cat => {
    try {
        console.log(`   > Scaricando ${cat}...`);
        const items = new Items({ category: [cat] });
        
        const cleanList = Array.from(items).filter(i => 
            i.name && !i.name.includes("PH") && !i.uniqueName.includes("Depricated")
        );
        
        const filePath = path.join(outputDir, `${cat}.json`);
        fs.writeFileSync(filePath, JSON.stringify(cleanList, null, 2), 'utf8');
        
        totalItems += cleanList.length;
    } catch (err) {
        console.error(`   ❌ Errore su ${cat}:`, err.message);
    }
});

console.log(`✅ AGGIORNAMENTO COMPLETATO: ${totalItems} oggetti salvati in ${outputDir}`);