// src/app/api/relics/lookup/route.js
import { NextResponse } from 'next/server';
import { fetchRelicsDB } from '@/utils/serverData';

export async function POST(request) {
    try {
        // Riceve una lista di nomi: ["Lith G1", "Meso N5"]
        const { names } = await request.json();
        
        if (!names || !Array.isArray(names) || names.length === 0) {
            return NextResponse.json([]);
        }

        const allRelics = await fetchRelicsDB();
        
        // Filtra solo quelle richieste
        const found = allRelics.filter(r => {
            // Pulizia nome reliquia nel DB per confronto
            const dbName = r.name.replace(' (Intact)', '').replace(' Relic', '').trim();
            return names.includes(dbName);
        }).map(r => ({
             name: r.name.replace(' (Intact)', '').replace(' Relic', '').trim(),
             drops: r.drops || [],
             vaulted: !r.drops || r.drops.length === 0
        }));

        return NextResponse.json(found);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}