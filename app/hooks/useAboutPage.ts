"use client"

import { useState, useEffect } from 'react';
import { AboutPageService } from '../services/aboutPage.service';
import type { AboutPageData } from '../interfaces/about.interface';

export const useAboutPage = () => {
    const [data, setData] = useState<AboutPageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAboutPageData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await AboutPageService.getAboutPageData();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAboutPageData();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchAboutPageData
    };
}; 