import { useState, useEffect } from 'react';
import { WorkService } from '../services/work.service';

interface WorkData {
    [id: string]: {
        title: string;
        start_date: string;
        end_date: string;
        description: string;
        company: string;
    }
}

export const useWorkPage = () => {
    const [data, setData] = useState<WorkData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWorkData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await WorkService.getWorkData();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch work data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkData();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchWorkData
    };
}; 