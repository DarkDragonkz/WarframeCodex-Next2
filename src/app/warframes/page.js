import { fetchGameData } from '@/utils/serverData';
import CodexListPage from '@/components/CodexListPage';

export default async function Page() {
    const [data, lookup] = await Promise.all([
        fetchGameData('Warframes.json'),
        fetchGameData('RelicLookup.json')
    ]);

    return (
        <CodexListPage 
            initialData={data} 
            lookupData={lookup}
            pageTitle="WARFRAMES" 
            categoryMode="warframes" // Passiamo solo la stringa!
        />
    );
}