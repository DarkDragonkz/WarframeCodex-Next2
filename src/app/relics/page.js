"use client";
import { Suspense, useState, useEffect } from 'react';
import CodexListPage from '@/components/CodexListPage';

// ... (le costanti createEraCategory e RELIC_CATEGORIES rimangono uguali) ...
const createEraCategory = (id, label, eraName) => ({
    id: id,
    label: label,
    filter: (item) => item.name.includes(eraName),
    subFilters: [
        { id: 'all', label: 'INTACT (DEFAULT)', filter: (i) => i.name.includes('Intact') },
        { id: 'exceptional', label: 'EXCEPTIONAL', filter: (i) => i.name.includes('Exceptional') },
        { id: 'flawless', label: 'FLAWLESS', filter: (i) => i.name.includes('Flawless') },
        { id: 'radiant', label: 'RADIANT', filter: (i) => i.name.includes('Radiant') },
        { id: 'everything', label: 'SHOW ALL', filter: () => true }
    ]
});

const RELIC_CATEGORIES = [
    createEraCategory('lith', 'LITH', 'Lith'),
    createEraCategory('meso', 'MESO', 'Meso'),
    createEraCategory('neo', 'NEO', 'Neo'),
    createEraCategory('axi', 'AXI', 'Axi'),
    createEraCategory('requiem', 'REQUIEM', 'Requiem'),
];

export default function Page() {
    const [relicData, setRelicData] = useState(null);

    useEffect(() => {
        async function fetchLocalData() {
            try {
                // Chiamiamo la TUA nuova API locale
                const res = await fetch('/api/get-all-files');
                const json = await res.json();

                if (json.status === "success" && json.data.Relics) {
                    setRelicData(json.data.Relics);
                } else {
                    throw new Error("Dati reliquie non trovati nell'API locale");
                }
            } catch (e) {
                console.error("Errore API Locale:", e);
                setRelicData([]);
            }
        }
        fetchLocalData();
    }, []);

    if (!relicData) return <div style={{color:'#fff', padding:'50px', textAlign:'center'}}>Generating Codex from Core...</div>;

    return (
        <CodexListPage 
            filesToLoad={[]} 
            manualData={relicData} 
            pageTitle="VOID RELICS" 
            customCategories={RELIC_CATEGORIES}
        />
    );
}