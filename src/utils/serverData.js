// src/utils/serverData.js
import fs from 'fs/promises';
import path from 'path';
import { API_BASE_URL } from './constants';

const DB_FOLDER = path.join(process.cwd(), 'database_api');

// CACHE GLOBALE IN MEMORIA (Singleton pattern)
global.dataCache = global.dataCache || {};

export async function fetchGameData(filename, forceRefresh = false) {
    const filePath = path.join(DB_FOLDER, filename);

    // 1. CONTROLLO CACHE RAM (Velocità Massima)
    if (!forceRefresh && global.dataCache[filename]) {
        return global.dataCache[filename];
    }

    // 2. CONTROLLO LOCALE SU DISCO
    if (!forceRefresh) {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const json = JSON.parse(fileContent);
            if (Array.isArray(json) && json.length > 0) {
                // Salva in RAM per la prossima volta
                global.dataCache[filename] = json;
                return json;
            }
        } catch (error) {
            // File mancante o corrotto, procedi al download
        }
    }

    // 3. DOWNLOAD DA GITHUB
    try {
        console.log(`[SERVER] Downloading ${filename}...`);
        const url = `${API_BASE_URL}/${filename}`;
        const res = await fetch(url, { cache: 'no-store' }); // No fetch cache
        if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${url}`);
        
        const data = await res.json();

        // 4. SALVATAGGIO DISCO + RAM
        try {
            await fs.mkdir(DB_FOLDER, { recursive: true });
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            global.dataCache[filename] = data; // Aggiorna RAM
            console.log(`[SERVER] Saved: ${filePath}`);
        } catch (writeErr) {
            console.error(`[SERVER] Disk write error:`, writeErr);
        }

        return data;
    } catch (error) {
        console.error(`[SERVER ERROR] Failed to load ${filename}:`, error);
        return [];
    }
}

export async function fetchRelicsDB() {
    return await fetchGameData('Relics.json');
}