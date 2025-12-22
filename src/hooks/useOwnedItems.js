// src/hooks/useOwnedItems.js
"use client";
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'warframe_codex_v7';

export function useOwnedItems() {
    const [ownedCards, setOwnedCards] = useState(new Set());
    const [isLoaded, setIsLoaded] = useState(false);

    // Carica dati all'avvio
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setOwnedCards(new Set(JSON.parse(saved)));
            } catch (e) {
                console.error("Errore lettura salvataggio", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Salva dati ad ogni modifica
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...ownedCards]));
        }
    }, [ownedCards, isLoaded]);

    // Funzione ottimizzata per toggle
    const toggleOwned = useCallback((id) => {
        setOwnedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    }, []);

    // Funzione per import massivo (es. da file JSON)
    const importItems = useCallback((itemsArray, rawData) => {
        setOwnedCards(prev => {
            const newSet = new Set(prev);
            let count = 0;
            itemsArray.forEach(entry => {
                const name = (typeof entry === 'string' ? entry : entry.item_name || entry.name).toLowerCase();
                const found = rawData.find(i => i.name.toLowerCase() === name);
                if (found) {
                    newSet.add(found.uniqueName);
                    count++;
                }
            });
            return newSet;
        });
    }, []);

    return { ownedCards, toggleOwned, importItems, isLoaded };
}