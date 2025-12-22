"use client";
import { useState, memo } from 'react';
import { IMG_BASE_URL, BASE_PATH } from '@/utils/constants';

// Helper dal vecchio file per calcolare le statistiche al volo
const getStatAtRank = (rank, maxRank, descriptionTemplate, levelStats) => {
    // Caso 1: Array di stats predefinito (Source: 59)
    if (levelStats && levelStats.length > 0) {
        let statsArray = levelStats[rank] ? levelStats[rank].stats : levelStats[levelStats.length - 1].stats;
        return statsArray.join('<br>');
    }
    // Caso 2: Calcolo matematico (Source: 61)
    if (!descriptionTemplate) return "";
    return descriptionTemplate.replace(/(\d+(\.\d+)?)/g, (match) => {
        const maxVal = parseFloat(match);
        const baseVal = maxVal / (maxRank + 1);
        const currentVal = baseVal * (rank + 1);
        return currentVal % 1 === 0 ? currentVal.toFixed(0) : currentVal.toFixed(1).replace(/\.0$/, '');
    }).replace(/\r\n|\n/g, "<br>");
};

const CodexCard = memo(function CodexCard({ item, isOwned, onToggleOwned }) {
    // Stato locale per il rank (solo per Mods/Arcanes)
    const [rank, setRank] = useState(item.maxRank || 0);

    const isMod = item.category === 'Mods';
    const isArcane = item.category === 'Arcanes';
    const isPrime = item.name.includes("Prime");
    
    // Logica aggiornamento rank (Source: 62)
    const updateRank = (e, change) => {
        e.stopPropagation();
        let newRank = rank + change;
        if (newRank < 0) newRank = 0;
        if (newRank > item.maxRank) newRank = item.maxRank;
        setRank(newRank);
    };

    // Determina cosa mostrare: Stats calcolate (se mod) o Descrizione statica
    let displayDesc = item.description || "Nessuna descrizione.";
    if (isMod || isArcane) {
        displayDesc = getStatAtRank(rank, item.maxRank, item.rawDescription || item.description, item.levelStats);
    }
    
    // Pulizia
    displayDesc = displayDesc.replace(/<br>/g, " <br/> "); 

    return (
        <div className={`card-wrapper ${isOwned ? 'owned' : ''}`} data-rarity={item.rarity || (isPrime ? 'Prime' : 'Common')}>
            
            {/* Immagine */}
            <div className="card-image-container">
                {/* Drain Box dal vecchio file (Source: 66) integrato nel nuovo stile */}
                {(item.baseDrain || item.polarityIcon) && (isMod || isArcane) && (
                    <div className="drain-box">
                        {item.baseDrain ? (item.baseDrain + rank) : ""}
                        {item.polarityIcon && <img src={item.polarityIcon} className="polarity-icon" alt="pol" />}
                    </div>
                )}

                {/* Checkbox */}
                <div className="owned-check" onClick={(e) => { e.stopPropagation(); onToggleOwned(item.uniqueName); }}>
                    {isOwned ? '✔' : ''}
                </div>

                {item.imageName ? (
                    <img 
                        src={`${IMG_BASE_URL}/${item.imageName}`} 
                        className="card-image-img" 
                        loading="lazy" 
                        alt={item.name}
                        style={isArcane ? { transform: 'scale(0.7)' } : {}} 
                    />
                ) : <div style={{fontSize:'10px', color:'#666'}}>{item.name}</div>}
            </div>

            {/* Info Area */}
            <div className="info-area">
                <div className="type-pill">{item.type}</div>
                <div className="mod-name" style={{color: isPrime ? 'var(--gold)' : '#fff'}}>
                    {item.name}
                </div>
                
                <div className="card-desc" dangerouslySetInnerHTML={{__html: displayDesc}}></div>

                {/* Rank Controls (Se è Mod/Arcane) - Source: 76 */}
                {(isMod || isArcane) && item.maxRank > 0 && (
                    <div className="rank-controls-container">
                        <button className="rank-btn" onClick={(e) => updateRank(e, -1)}>-</button>
                        <div className="ranks-dots">
                             {/* Mostriamo massimo 10 pallini per evitare overflow grafico */}
                            {Array.from({length: Math.min(item.maxRank + 1, 10)}).map((_, i) => (
                                <div key={i} className={`dot ${i <= (rank / item.maxRank * Math.min(item.maxRank, 9)) ? 'active' : ''}`}></div>
                            ))}
                        </div>
                        <button className="rank-btn" onClick={(e) => updateRank(e, 1)}>+</button>
                    </div>
                )}

                <a href={`https://warframe.fandom.com/wiki/${item.name.replace(/ /g, '_')}`} target="_blank" className="wiki-btn-block" onClick={(e) => e.stopPropagation()}>
                    WIKI
                </a>
            </div>
        </div>
    );
});

export default CodexCard;