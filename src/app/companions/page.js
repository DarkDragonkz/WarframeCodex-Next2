import { fetchGameData } from '@/utils/serverData';
import CodexListPage from '@/components/CodexListPage';

export default async function Page() {
    const [data, lookup] = await Promise.all([
        fetchGameData('Sentinels.json'),
        fetchGameData('RelicLookup.json')
    ]);

    return (
        <CodexListPage 
            initialData={data} 
            lookupData={lookup}
            pageTitle="COMPANIONS" 
            categoryMode="companions"
        />
    );
}