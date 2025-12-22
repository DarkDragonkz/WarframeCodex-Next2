// src/app/amps/page.js
import CodexListPage from '@/components/CodexListPage';
import { fetchGameData } from '@/utils/serverData';

export default async function Page() {
    // Gli Amp sono spesso in Secondary.json o Misc.json. 
    // Li cerchiamo e filtriamo.
    const secondary = await fetchGameData('Secondary.json');
    const misc = await fetchGameData('Misc.json');
    
    const allItems = [...secondary, ...misc];
    
    // Filtro manuale per trovare gli Amp
    const amps = allItems.filter(i => 
        (i.type && i.type.toLowerCase().includes('amp')) || 
        (i.name && i.name.toLowerCase().includes(' amp')) ||
        (i.uniqueName && i.uniqueName.includes('OPERATOR_AMPLIFIER'))
    );

    return <CodexListPage initialData={amps} pageTitle="AMPS" />;
}