import { useState, useEffect } from 'react';
import { ProjectService } from '../services/project.service';

interface ProjectData {
    [id: string]: {
        title: string;
        type: string;
        description: string;
        image_url: string;
        github_url: string;
        project_url?: string;
        technologies: any;
        created_at: string;
        updated_at: string;
    }
}

export const useProjectPage = () => {
    const [data, setData] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjectData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await ProjectService.getProjectData();
            setData(result);
        } catch (err) {
            console.error('useProjectPage error:', err); // Debug log
            
            // Fallback to mock data if API is not available
            console.log('Using fallback mock data for projects');
            const mockData = {
                'project-1': {
                    title: 'Journey Trail Bus System',
                    type: 'Web and App Dev',
                    description: 'A comprehensive bus tracking system',
                    image_url: '/assets/crmc.png',
                    github_url: '#',
                    project_url: '#',
                    technologies: ['React', 'Node.js'],
                    created_at: '2023-01-15',
                    updated_at: '2023-12-20'
                },
                'project-2': {
                    title: 'Prodora Productivity App',
                    type: 'App Dev',
                    description: 'A productivity app for task management',
                    image_url: '/assets/nico.png',
                    github_url: '#',
                    project_url: '#',
                    technologies: ['React Native', 'Firebase'],
                    created_at: '2023-06-01',
                    updated_at: '2023-12-15'
                },
                'project-3': {
                    title: 'E-commerce Platform',
                    type: 'UI/UX Design',
                    description: 'A modern e-commerce platform design',
                    image_url: '/assets/crmc.png',
                    github_url: '#',
                    project_url: '#',
                    technologies: ['Figma', 'React'],
                    created_at: '2023-09-10',
                    updated_at: '2023-12-10'
                },
                'project-4': {
                    title: 'Social Media Dashboard',
                    type: 'Full Stack',
                    description: 'A comprehensive social media management tool',
                    image_url: '/assets/nico.png',
                    github_url: '#',
                    project_url: '#',
                    technologies: ['Next.js', 'PostgreSQL'],
                    created_at: '2023-11-01',
                    updated_at: '2023-12-05'
                }
            };
            setData(mockData);
            setError(null); // Clear error since we're using fallback data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchProjectData
    };
}; 