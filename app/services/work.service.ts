import axios from 'axios';

// Define the base URL for your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface WorkData {
    [id: string]: {
        title: string;
        start_date: string;
        end_date: string;
        description: string;
        company: string;
    }
}

export class WorkService {
    private static baseURL = `${API_BASE_URL}/work`;

    // Fetch all work data
    static async getWorkData(): Promise<WorkData> {
        try {
            const response = await axios.get<WorkData>(this.baseURL);
            return response.data;
        } catch (error) {
            console.error('Error fetching work data:', error);
            throw error;
        }
    }

    // Create new work data
    static async createWork(data: WorkData[string]): Promise<WorkData[string]> {
        try {
            const response = await axios.post(this.baseURL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating work:', error);
            throw error;
        }
    }

    // Update work data
    static async updateWork(id: string, data: WorkData[string]): Promise<WorkData[string]> {
        try {
            const response = await axios.put(`${this.baseURL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating work:', error);
            throw error;
        }
    }

    // Delete work data
    static async deleteWork(id: string): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await axios.delete(`${this.baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting work:', error);
            throw error;
        }
    }
} 