import type {Details} from "../types/details.ts";
import {useEffect, useState} from "react";

// const API_BASE = import.meta.env.VITE_API_URL || '';

import capRepData from "../../../../../../RZHDBack/temp/jsonData/caprep-json.json";

interface UseDetailsDataReturn {
    details: Details[];
    loading: boolean;
    error: string | null;
}

// const API_URLS  = {
//     MajorRepair_PATH: `${API_BASE}/api/production/major-repair`,
// }

export const useDetailsData = (): UseDetailsDataReturn => {
    const [details, setDetails] = useState<Details[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                setDetails(capRepData.details || []);
            } catch (err) {
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