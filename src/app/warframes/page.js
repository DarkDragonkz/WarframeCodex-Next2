"use client";
import { Suspense } from 'react';
import CodexListPage from '@/components/CodexListPage';

// CONFIGURAZIONE CATEGORIE (ALL, BASE, PRIME)
const WARFRAME_CATEGORIES = [
    {
        id: 'all',
        label: 'ALL',
        // RIMUOVE I NECRAMECH
        filter: (item) => 
            (item.type || "").toLowerCase().includes('warframe') && 
            item.category === 'Warframes' &&
            !item.name.toLowerCase().includes('necramech') &&
            !(item.type || "").toLowerCase().includes('necramech')
    },
    {
        id: 'base',
        label: 'BASE',
        filter: (item) => 
            (item.type || "").toLowerCase().includes('warframe') && 
            item.category === 'Warframes' && 
            !item.name.includes('Prime') &&
            !item.name.toLowerCase().includes('necramech')
    },
    {
        id: 'prime',
        label: 'PRIME',
        filter: (item) => 
            (item.type || "").toLowerCase().includes('warframe') && 
            item.category === 'Warframes' && 
            item.name.includes('Prime') &&
            !item.name.toLowerCase().includes('necramech')
    }
];

export default function Page() {
    return (
        <Suspense fallback={<div style={{color:'#fff', padding:'50px', textAlign:'center'}}>Loading Interface...</div>}>
            <CodexListPage 
                filesToLoad={['Warframes.json']} 
                pageTitle="WARFRAMES" 
                customCategories={WARFRAME_CATEGORIES}
            />
        </Suspense>
    );
}