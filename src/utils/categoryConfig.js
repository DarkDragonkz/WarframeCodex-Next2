// src/utils/categoryConfig.js

const isArcane = (item) => item.category === 'Arcanes' || (item.type && item.type.toLowerCase().includes('arcane'));
const isGalvanized = (item) => item.name.includes('Galvanized ') || item.name.includes('Primed ') || item.name.includes('Amalgam ');
const isArchon = (item) => item.name.includes('Archon ');
const isWeaponType = (item) => {
    const t = (item.type || "").toLowerCase();
    return t.includes('primary') || t.includes('secondary') || t.includes('melee') || t.includes('gun');
};

export const CATEGORY_CONFIGS = {
    'warframes': [
        { id: 'all', label: 'WARFRAMES', filter: (item) => (item.type || "").toLowerCase() === 'warframe' }
    ],
    'companions': [
        {
            id: 'robotic', label: 'SENTINELS', 
            filter: (item) => {
                const t = (item.type || "").toLowerCase();
                return t.includes('sentinel') || t.includes('robotic') || t.includes('moa');
            }
        },
        {
            id: 'beast', label: 'BEASTS',
            filter: (item) => {
                const t = (item.type || "").toLowerCase();
                return t.includes('kubrow') || t.includes('kavat') || t.includes('beast');
            }
        },
        {
            id: 'necramech', label: 'NECRAMECHS',
            filter: (item) => (item.type || "").toLowerCase().includes('necramech')
        }
    ],
    'mods': [
        {
            id: 'base', label: 'BASE MODS',
            filter: (item) => {
                const isSpecial = isGalvanized(item) || isArchon(item) || item.name.includes('Riven') || isArcane(item);
                const isMod = item.category === 'Mods' || (item.type || "").toLowerCase().includes('aura');
                return !isSpecial && isMod;
            },
            subFilters: [
                { id: 'all', label: 'ALL', filter: () => true }, // Changed TUTTI -> ALL
                { id: 'wf', label: 'WARFRAME', filter: (item) => (item.type || "").toLowerCase().includes('warframe') },
                { id: 'wep', label: 'WEAPONS', filter: (item) => isWeaponType(item) }
            ]
        },
        {
            id: 'elite', label: 'PRIMED & GALVANIZED',
            filter: (item) => isGalvanized(item)
        },
        {
            id: 'arcanes', label: 'ARCANES',
            filter: (item) => isArcane(item)
        }
    ]
};