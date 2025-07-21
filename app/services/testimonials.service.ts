import axios from 'axios';

// Define the base URL for your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5732';

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

export class TestimonialsService {
    private static get baseURL() {
        const apiUrl = API_BASE_URL || 'http://localhost:5732';
        return `${apiUrl}/testimonials`;
    }

    // Fetch all testimonials data
    static async getTestimonialsData(): Promise<TestimonialsData> {
        try {
            console.log('Fetching from URL:', this.baseURL); // Debug log
            const response = await axios.get<TestimonialsData>(this.baseURL);
            return response.data;
        } catch (error) {
            console.error('Error fetching testimonials data from:', this.baseURL, error);
            throw error;
        }
    }

    // Create new testimonials data
    static async createTestimonial(data: any): Promise<any> {
        try {
            const response = await axios.post(this.baseURL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating testimonial:', error);
            throw error;
        }
    }

    // Update testimonials data
    static async updateTestimonial(id: string, data: any): Promise<any> {
        try {
            const response = await axios.put(`${this.baseURL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating testimonial:', error);
            throw error;
        }
    }

    // Delete testimonials data
    static async deleteTestimonial(id: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            throw error;
        }
    }
} 