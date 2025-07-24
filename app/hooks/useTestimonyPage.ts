import type { Testimonials } from "@/types/Testimonials";
import { useEffect, useState } from "react";
import axios from "axios";

export const useTestimonialPage = () => {
    const [data, setData] = useState<Testimonials[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get('/api/testimonials')
                const rawData = res.data
                const cleaned: Testimonials[] = Object.values(rawData)
                setData(cleaned)
            }
            catch(err: unknown){
                if(err instanceof Error){
                    setError(err.message)
                }else{
                    setError('Unknown Error')
                }
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return {data, loading, error}
}