import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const contactService = {
  async sendMessage(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact/send-message`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          success: false,
          message: error.response.data?.message || 'Failed to send message',
          error: error.response.data?.error
        };
      }
      return {
        success: false,
        message: 'Network error. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}; 