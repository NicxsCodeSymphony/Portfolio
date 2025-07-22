import axios from 'axios';
import type { AboutPageData } from '../interfaces/about.interface';

// Define the base URL for your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
    static async createAboutPage(data: AboutPageData['aboutPage'][string]): Promise<AboutPageData['aboutPage'][string]> {
        try {
            const response = await axios.post(`${API_BASE_URL}/aboutPage`, data);
            return response.data;
        } catch (error) {
            console.error('Error creating about page:', error);
            throw error;
        }
    }

    // Update about page data
    static async updateAboutPage(id: string, data: AboutPageData['aboutPage'][string]): Promise<AboutPageData['aboutPage'][string]> {
        try {
            const response = await axios.put(`${API_BASE_URL}/aboutPage/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating about page:', error);
            throw error;
        }
    }

    // Delete about page data
    static async deleteAboutPage(id: string): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/aboutPage/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting about page:', error);
            throw error;
        }
    }
} 