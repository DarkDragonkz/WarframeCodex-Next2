import { fetchGameData } from '@/utils/serverData';
import CodexListPage from '@/components/CodexListPage';

export default async function Page() {
    const data = await fetchGameData('Warframes.json');

    return (
        <CodexListPage 
            initialData={data} 
            pageTitle="NECRAMECHS" 
            categoryMode="necramechs"
        />
    );
}