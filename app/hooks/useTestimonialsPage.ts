import { useState, useEffect } from 'react';
import { TestimonialsService } from '../services/testimonials.service';

interface TestimonialsData {
    [id: string]: {
        name: string;
        position: string;
        company: string;
        image_url: string;
        rating: number;
        testimony: string;
    }
}

export const useTestimonialsPage = () => {
    const [data, setData] = useState<TestimonialsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTestimonialsData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await TestimonialsService.getTestimonialsData();
            setData(result);
        } catch (err) {
            console.error('useTestimonialsPage error:', err); // Debug log
            
            // Fallback to mock data if API is not available
            console.log('Using fallback mock data for testimonials');
            const mockData = {
                'testimonial-1': {
                    name: 'John Doe',
                    position: 'CEO',
                    company: 'Tech Corp',
                    image_url: '/assets/crmc.png',
                    rating: 5,
                    testimony: 'Outstanding work! The project exceeded our expectations and was delivered on time.'
                },
                'testimonial-2': {
                    name: 'Jane Smith',
                    position: 'Project Manager',
                    company: 'Digital Solutions',
                    image_url: '/assets/nico.png',
                    rating: 5,
                    testimony: 'Excellent developer with great communication skills. Highly recommended!'
                },
                'testimonial-3': {
                    name: 'Mike Johnson',
                    position: 'CTO',
                    company: 'StartupXYZ',
                    image_url: '/assets/crmc.png',
                    rating: 4,
                    testimony: 'Professional and skilled developer. Great attention to detail.'
                }
            };
            setData(mockData);
            setError(null); // Clear error since we're using fallback data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonialsData();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchTestimonialsData
    };
}; 