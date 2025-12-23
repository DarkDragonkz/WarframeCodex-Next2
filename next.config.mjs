/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Fondamentale per GitHub Pages
    
    // Sostituisci 'warframecodex-next' con il nome ESATTO del tuo repository GitHub
    basePath: '/warframecodex-next', 
    assetPrefix: '/warframecodex-next/',
    
    images: {
        unoptimized: true, // Necessario per l'export statico
    },
};

export default nextConfig;