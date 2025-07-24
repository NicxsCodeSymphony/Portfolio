import type { Projects } from "@/types/Projects";
import { useEffect, useState } from "react";
import axios from "axios";

export const useProjectPage = () => {
    const [data, setData] = useState<Projects[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get('/api/projects')
                const rawData = res.data
                const cleaned: Projects[] = Object.values(rawData)
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