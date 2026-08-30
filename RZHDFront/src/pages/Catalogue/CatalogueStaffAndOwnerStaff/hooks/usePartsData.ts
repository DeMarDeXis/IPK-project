import type {CatalogMode, Part} from "../types/partitions.ts";
import {useEffect, useState} from "react";

import dieselData from "../../../../data/DieselD50Series.json";
import privateData from "../../../../data/PrivateProd.json";

interface UsePartsDataReturn {
    parts: Part[];
    loading: boolean;
    error: string | null;
    mode: CatalogMode;
    setMode: (mode: CatalogMode) => void;
}

export const usePartsData = (): UsePartsDataReturn => {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<CatalogMode>('catalogue');

    useEffect(() => {
        const loadData = () => {
            try {
                setLoading(true);
                setError(null);

                // Directly use the imported JSON data instead of fetching
                const partsData = mode === 'catalogue'
                    ? (dieselData.diesel_D50_Series || [])
                    : (privateData.private_prod || []);

                setParts(partsData as Part[]);
            } catch (err) {
                setError(`Data is not available or ERROR.`);
                console.error('[ERROR] Data load error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [mode]);

    return { parts, loading, error, mode, setMode };
};