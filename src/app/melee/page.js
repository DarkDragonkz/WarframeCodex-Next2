import CodexListPage from '@/components/CodexListPage';
import { fetchGameData } from '@/utils/serverData';

export default async function Page() {
    const data = await fetchGameData('Melee.json');
    return <CodexListPage initialData={data} pageTitle="MELEE WEAPONS" />;
}