import axios from 'axios';

// Define the base URL for your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface AboutPageData {
    aboutPage: {
        [id: string]: {
            title: string;
            subTitle: string;
            description: string;
            cv_link: string;
        }
    };
    stats: {
        [id: string]: {
            availability: string;
            client_count: number;
            contact: string;
            email: string;
            location: string;
            project_completed: number;
            work_stats: number;
        }
    };
    links: {
        [id: string]: {
            link: string;
            social: string;
        }
    };
}

export class AboutPageService {
    // Note: This service fetches from multiple endpoints

    // Fetch all about page data including stats
    static async getAboutPageData(): Promise<AboutPageData> {
        try {
            // Fetch both aboutPage and stats+links data
            const [aboutPageResponse, statsResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/aboutPage`),
                axios.get(`${API_BASE_URL}/stats`)
            ]);
            
            // Combine the responses
            return {
                aboutPage: aboutPageResponse.data,
                stats: statsResponse.data.stats,
                links: statsResponse.data.links
            };
        } catch (error) {
            console.error('Error fetching about page data:', error);
            throw error;
        }
    }

    // Create new about page data
    static async createAboutPage(data: any): Promise<any> {
        try {
            const response = await axios.post(`${API_BASE_URL}/aboutPage`, data);
            return response.data;
        } catch (error) {
            console.error('Error creating about page:', error);
            throw error;
        }
    }

    // Update about page data
    static async updateAboutPage(id: string, data: any): Promise<any> {
        try {
            const response = await axios.put(`${API_BASE_URL}/aboutPage/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating about page:', error);
            throw error;
        }
    }

    // Delete about page data
    static async deleteAboutPage(id: string): Promise<any> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/aboutPage/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting about page:', error);
            throw error;
        }
    }
} 