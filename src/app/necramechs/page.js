import CodexListPage from '@/components/CodexListPage';
import { fetchGameData } from '@/utils/serverData';

export default async function Page() {
    const data = await fetchGameData('Warframes.json'); // I mech sono qui dentro
    return <CodexListPage initialData={data} pageTitle="NECRAMECHS" categoryMode="necramechs" />;
}