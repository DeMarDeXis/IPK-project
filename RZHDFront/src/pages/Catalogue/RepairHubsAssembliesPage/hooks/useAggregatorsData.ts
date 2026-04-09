import type {Aggregator} from "../types/aggregators.ts";
import {useEffect, useState} from "react";

interface UseAggregatorsDataReturn {
    aggregators: Aggregator[];
    loading: boolean;
    error: string | null;
}

const API_URL = '/api/production/rep-hh';

export const useAggregatorsData = (): UseAggregatorsDataReturn => {
    const [aggregators, setAggregators] = useState<Aggregator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`HTTP STATUS: ${response.status}`)

                const data = await response.json();
                setAggregators(data.aggregators);
            } catch (error) {
                setError(`Data is not available or ERROR.`);
                console.error('[ERROR] Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { aggregators, loading, error }
}