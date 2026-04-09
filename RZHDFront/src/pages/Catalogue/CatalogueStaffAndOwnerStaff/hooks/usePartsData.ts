import type {CatalogMode, Part} from "../types/partitions.ts";
import {useEffect, useState} from "react";

interface UsePartsDataReturn {
    parts: Part[];
    loading: boolean;
    error: string | null;
    mode: CatalogMode;
    setMode: (mode: CatalogMode) => void;
}

const API_URLS = {
    D50_PATH: "/api/production/d50",
    PrivateProds_PATH: "/api/production/private-prod",
};

export const usePartsData = (): UsePartsDataReturn => {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<CatalogMode>('catalogue');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const endpoint = mode === 'catalogue'
                    ? API_URLS.D50_PATH
                    : API_URLS.PrivateProds_PATH;

                const response = await fetch(endpoint);
                if (!response.ok) throw new Error(`HTTP STATUS: ${response.status}`)

                const data = await response.json();
                const partsData = mode === 'catalogue'
                    ? data.diesel_D50_Series || []
                    : data.private_prod || [];

                setParts(partsData);
            } catch (error) {
                setError(`Data is not available or ERROR.`)
                console.error('[ERROR] Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mode]);

    return { parts, loading, error, mode, setMode };
};