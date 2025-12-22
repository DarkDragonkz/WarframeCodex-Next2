import CodexListPage from '@/components/CodexListPage';
import { fetchGameData } from '@/utils/serverData';

export default async function Page() {
    const data = await fetchGameData('Mods.json');
    // Qui usiamo categoryMode="mods" per attivare i filtri speciali delle mod
    return <CodexListPage initialData={data} pageTitle="MODS & ARCANES" categoryMode="mods" />;
}