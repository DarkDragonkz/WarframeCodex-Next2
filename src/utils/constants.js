// src/utils/constants.js

// URL Base: Punta alla tua cartella locale 'public/database_api'
// Nota: in Next.js, tutto ciò che è in 'public' è accessibile alla root '/'
export const API_BASE_URL = "/database_api";

// CDN Immagini (Resta invariato)
export const IMG_BASE_URL = "https://cdn.warframestat.us/img";

export const REPO_NAME = 'warframecodex-next';
export const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${REPO_NAME}` : '';