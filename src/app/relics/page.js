import { fetchGameData } from '@/utils/serverData';
import CodexListPage from '@/components/CodexListPage';

export default async function Page() {
    const data = await fetchGameData('Relics.json');

    return (
        <CodexListPage 
            initialData={data} 
            pageTitle="VOID RELICS" 
            categoryMode="relics"
        />
    );
}