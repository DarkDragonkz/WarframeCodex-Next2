import CodexListPage from '@/components/CodexListPage';
import { fetchGameData } from '@/utils/serverData';

export default async function Page() {
    const data = await fetchGameData('Secondary.json');
    return <CodexListPage initialData={data} pageTitle="SECONDARY WEAPONS" />;
}