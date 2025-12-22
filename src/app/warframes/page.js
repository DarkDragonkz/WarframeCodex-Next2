"use client";
import { Suspense } from 'react';
import CodexListPage from '@/components/CodexListPage';

const WARFRAME_CATEGORIES = [
    {
        id: 'all',
        label: 'WARFRAMES',
        filter: (item) => (item.type || "").toLowerCase() === 'warframe' && item.category === 'Warframes'
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