import CodexListPage from '@/components/CodexListPage';
import { fetchGameData } from '@/utils/serverData';

export default async function Page() {
    // Scarica Sentinelle e Animali (Pet)
    const [sentinels, pets] = await Promise.all([
        fetchGameData('Sentinels.json'),
        fetchGameData('Pets.json')
    ]);
    
    // Unisci i dati in un'unica lista
    const data = [...sentinels, ...pets];

    return (
        <CodexListPage 
            initialData={data} 
            pageTitle="COMPANIONS" 
            categoryMode="companions" 
        />
    );
}