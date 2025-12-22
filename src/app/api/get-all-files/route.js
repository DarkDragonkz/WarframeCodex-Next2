import { NextResponse } from 'next/server';
import Items from 'warframe-items';

export async function GET() {
    try {
        console.log("⏳ Inizio generazione database locale con warframe-items...");

        // Definiamo le categorie che ci interessano
        const categories = [
            'Warframes', 
            'Primary', 
            'Secondary', 
            'Melee', 
            'Relics', 
            'Mods', 
            'Sentinels', 
            'Archwing', 
            'Arch-Gun', 
            'Arch-Melee',
            'Skins', // Opzionale
            'Gear'   // Opzionale
        ];

        const fullDatabase = {};

        // Cicliamo su ogni categoria e usiamo la libreria per estrarre i dati
        categories.forEach(cat => {
            // Nota: La libreria accetta 'category' come filtro
            const items = new Items({ category: [cat] });
            
            // Convertiamo l'oggetto iterabile in un array semplice
            // Filtriamo via le cose inutili (tipo oggetti test o non rilasciati se necessario)
            const cleanList = Array.from(items).filter(i => i.name && !i.name.includes("PH")); 
            
            fullDatabase[cat] = cleanList;
        });

        console.log(`✅ Database generato con successo!`);
        
        // Restituiamo tutto il malloppo
        return NextResponse.json({
            status: "success",
            source: "Local NPM warframe-items",
            timestamp: new Date().toISOString(),
            data: fullDatabase
        });

    } catch (error) {
        console.error("❌ Errore critico generazione DB:", error);
        return NextResponse.json({ 
            status: "error", 
            message: error.message 
        }, { status: 500 });
    }
}