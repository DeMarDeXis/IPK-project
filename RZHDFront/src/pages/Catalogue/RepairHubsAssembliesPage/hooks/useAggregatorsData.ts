import type { Aggregator } from "../types/aggregators.ts";
import { useEffect, useState } from "react";

import repairHHData from "../../../../data/repairHH.json";

interface UseAggregatorsDataReturn {
    aggregators: Aggregator[];
    loading: boolean;
    error: string | null;
}

export const useAggregatorsData = (): UseAggregatorsDataReturn => {
    const [aggregators, setAggregators] = useState<Aggregator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            setAggregators(repairHHData.aggregators || []);
        } catch (err) {
            setError(`Данные недоступны.`);
            console.error('[ERROR] Data error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { aggregators, loading, error };
};