import axios from 'axios';

// Define the base URL for your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProjectData {
    [id: string]: {
        title: string;
        type: string;
        description: string;
        image_url: string;
        github_url: string;
        technologies: any;
        created_at: string;
        updated_at: string;
    }
}

export class ProjectService {
    private static get baseURL() {
        const apiUrl = API_BASE_URL;
        return `${apiUrl}/projects`;
    }

    // Fetch all project data
    static async getProjectData(): Promise<ProjectData> {
        try {
            console.log('Fetching from URL:', this.baseURL); // Debug log
            const response = await axios.get<ProjectData>(this.baseURL);
            return response.data;
        } catch (error) {
            console.error('Error fetching project data from:', this.baseURL, error);
            throw error;
        }
    }

    // Create new project data
    static async createProject(data: any): Promise<any> {
        try {
            const response = await axios.post(this.baseURL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    // Update project data
    static async updateProject(id: string, data: any): Promise<any> {
        try {
            const response = await axios.put(`${this.baseURL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }

    // Delete project data
    static async deleteProject(id: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
} 