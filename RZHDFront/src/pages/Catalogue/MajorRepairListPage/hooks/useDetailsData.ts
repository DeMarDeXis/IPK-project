import type {Details} from "../types/details.ts";
import {useEffect, useState} from "react";


interface UseDetailsDataReturn {
    details: Details[];
    loading: boolean;
    error: string | null;
}

const API_URLS  = {
    MajorRepair_PATH: "/api/production/major-repair",
}

export const useDetailsData = (): UseDetailsDataReturn => {
    const [details, setDetails] = useState<Details[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_URLS.MajorRepair_PATH);
                if (!response.ok) throw new Error(`HTTP STATUS: ${response.status}`)

                const data = await response.json();
                setDetails(data.details || []);
            } catch (error) {
                setError(`Details data is not available or ERROR.`);
                console.error('[ERROR] Fetch error:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData()
    }, []);

    return { details, loading, error}
};