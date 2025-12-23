// Configurazione per GitHub Pages
const REPO_NAME = '/warframecodex-next'; 

// Verifica se siamo in produzione (GitHub) o sviluppo (Localhost)
const isProd = process.env.NODE_ENV === 'production';

// Se siamo in produzione, usiamo il nome del repo come prefisso per i dati
export const BASE_PATH = isProd ? REPO_NAME : '';

// 1. I dati JSON rimangono nel tuo repository (perché li hai personalizzati/scaricati)
export const API_BASE_URL = `${BASE_PATH}/database_api`;

// 2. LE IMMAGINI invece le prendiamo dalla CDN ufficiale (Niente scaricamento locale!)
export const IMG_BASE_URL = 'https://cdn.warframestat.us/img'; 

export const APP_VERSION = "6.8 - CDN Images";