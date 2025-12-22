import { NextResponse } from 'next/server';
import Items from 'warframe-items';
import fs from 'fs';
import path from 'path';

// Questa API scarica, rigenera l'INTERO database e SALVA i file su disco
export async function GET() {
    try {
        console.log("⏳ Inizio generazione FULL DATABASE locale...");

        const allCategories = [
            'Warframes', 'Primary', 'Secondary', 'Melee', 'Archwing', 
            'Arch-Gun', 'Arch-Melee', 'Sentinels', 'Pets', 'Mods', 
            'Relics', 'Skins', 'Gear', 'Resources', 'Fish', 
            'Glyphs', 'Sigils', 'Enemy', 'Misc', 'Quest'
        ];

        const fullDatabase = {};
        let totalItemsCount = 0;

        // 1. Definiamo dove salvare i file
        // Salviamo in "public/database_api" così il sito può leggerli facilmente con fetch()
        const outputDir = path.join(process.cwd(), 'public', 'database_api');

        // Crea la cartella se non esiste
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // 2. Generazione Dati
        allCategories.forEach(cat => {
            try {
                const items = new Items({ category: [cat] });
                const cleanList = Array.from(items).filter(i => 
                    i.name && !i.name.includes("PH") && !i.uniqueName.includes("Depricated")
                );
                
                fullDatabase[cat] = cleanList;
                totalItemsCount += cleanList.length;

                // 3. SALVATAGGIO FISICO DEL FILE JSON
                // Scrive es: public/database_api/Warframes.json
                const filePath = path.join(outputDir, `${cat}.json`);
                fs.writeFileSync(filePath, JSON.stringify(cleanList, null, 2), 'utf8');
                
                console.log(`   💾 Salvato ${cat}.json (${cleanList.length} items)`);

            } catch (err) {
                console.warn(`   ! Errore generazione ${cat}`, err);
            }
        });

        console.log(`✅ TUTTI I FILE SONO STATI SCRITTI IN: ${outputDir}`);
        
        return NextResponse.json({
            status: "success",
            message: `Database rigenerato e salvato su disco.`,
            path: outputDir,
            total_items: totalItemsCount,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("❌ Errore critico:", error);
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
}