import { useState, useEffect } from "react";
import axios from "axios";
import { AboutPage } from "@/types/About";

export type AboutPageWithNested = Omit<AboutPage, 'uid'> & {
    personalInfo: {
    name: string;
    position: string;
    address: string;
    email: string;
    contact: string;
    status: string;
    website: string;
    projects_count: number;
    client_count: number;
    companies: number;
    years_experience: number;
    image1: string;
    image2: string;
    image3: string; 
    };
    files: Record<string, unknown>
}

export const useAboutPage = () =>{ 
    const [data, setData] = useState<AboutPageWithNested[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAboutPage = async () => {
            try{
                const res = await axios.get("/api/aboutPage")

                const rawData = res.data

                const cleaned: AboutPageWithNested[] = Object.values(rawData)

                setData(cleaned)
            }
            catch(err: unknown){
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("Unknown error")
                }
            }finally{
                setLoading(false)
            }
        }
        fetchAboutPage()
    }, [])

    return {data, loading, error}
}