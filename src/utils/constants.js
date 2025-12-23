// src/utils/constants.js

// URL Base: Punta alla cartella statica generata dallo script
export const API_BASE_URL = "/database_api";

export const IMG_BASE_URL = "https://cdn.warframestat.us/img";

export const REPO_NAME = 'warframecodex-next';
// Configurazione per GitHub Pages
const REPO_NAME = '/warframecodex-next'; // Deve coincidere con il basePath in next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

// Se siamo in produzione (GitHub), aggiungiamo il prefisso del repo.
// Se siamo in locale, usiamo il percorso normale.
export const BASE_PATH = isProd ? REPO_NAME : '';

export const API_BASE_URL = `${BASE_PATH}/database_api`;

// Export generico per debugging
export const APP_VERSION = "6.2 - GitHub Fix";