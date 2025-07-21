import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface StatsData{
    [id: string]: {
        email: string;
        contact: string;
        
    }
}